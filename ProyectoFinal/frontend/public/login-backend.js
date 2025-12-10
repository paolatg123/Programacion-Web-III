// login-backend.js - Conexión con el backend

// 1. FUNCIÓN PARA REGISTRAR USUARIO
async function registrarUsuario(username, email, password) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return { success: true, data: data };
        } else {
            return { success: false, error: data.error };
        }
        
    } catch (error) {
        return { success: false, error: 'Error de conexión con el servidor' };
    }
}

// 2. CONECTAR FORMULARIO DE REGISTRO
document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    // Verificar fortaleza
    const strength = checkPasswordStrength(password);
    if (strength !== 'Fuerte') {
        alert('La contraseña debe ser Fuerte (mínimo 8 caracteres, mayúsculas, números y símbolos)');
        return;
    }
    
    // Mostrar loading
    const registerBtn = document.getElementById('register-btn');
    const originalText = registerBtn.textContent;
    registerBtn.textContent = 'Registrando...';
    registerBtn.disabled = true;
    
    // Registrar en backend
    const resultado = await registrarUsuario(username, email, password);
    
    // Restaurar botón
    registerBtn.textContent = originalText;
    registerBtn.disabled = false;
    
    if (resultado.success) {
        alert('¡Registro exitoso! Usuario guardado en base de datos.\n\nAhora puedes iniciar sesión.');
        
        // Cambiar a pestaña de login
        document.querySelector('.loginBtn').click();
        
        // Limpiar formulario
        document.getElementById('reg-username').value = '';
        document.getElementById('reg-email').value = '';
        document.getElementById('reg-password').value = '';
        
    } else {
        alert(`Error: ${resultado.error || 'Error en el registro'}`);
    }
});

// 3. FUNCIÓN PARA LOGIN
async function iniciarSesion(username, password) {
    try {
        console.log('Enviando login a backend...');
        
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return { success: true, data: data };
        } else {
            return { success: false, error: data.error };
        }
        
    } catch (error) {
        return { success: false, error: 'Error de conexión' };
    }
}

// 4. CONECTAR FORMULARIO DE LOGIN
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validar CAPTCHA local
    const captchaCode = document.getElementById('captcha-code').textContent;
    const userInput = document.getElementById('captcha-input').value;
    
    if (userInput !== captchaCode) {
        alert('El código CAPTCHA es incorrecto');
        generateCaptcha();
        return;
    }
    
    // Mostrar loading
    const loginBtn = this.querySelector('button[type="submit"]');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Iniciando sesión...';
    loginBtn.disabled = true;
    
    // Llamar al backend
    const resultado = await iniciarSesion(username, password);
    
    // Restaurar botón
    loginBtn.textContent = originalText;
    loginBtn.disabled = false;
    
    if (resultado.success) {
        alert(' ¡Login exitoso! Redirigiendo...');
        
        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(resultado.data.user));
        localStorage.setItem('token', resultado.data.token || 'token-simulado');
        
        // Redirigir a la página principal
        window.location.href = '/coleccion';
        
    } else {
        alert(`Error: ${resultado.error || 'Error en el login'}`);
        generateCaptcha(); // Nuevo CAPTCHA
    }
});

// 5. FUNCIÓN DE FORTALEZA DE CONTRASEÑA (si no existe)
if (typeof checkPasswordStrength !== 'function') {
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        if (password.length === 0) return '';
        if (strength <= 2) return 'Débil';
        if (strength === 3) return 'Media';
        return 'Fuerte';
    }
}