// دالة إظهار وإخفاء كلمة المرور
function togglePassword() {
    const input = document.getElementById('loginPassword');
    const icon = document.querySelector('.toggle-password');
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

// دالة التعامل مع الدخول والربط بالسيرفر
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginBtn = document.getElementById('loginBtn');
    const messageBox = document.getElementById('message-box');

    loginBtn.disabled = true;
    loginBtn.innerText = 'Logging in...';
    messageBox.style.display = 'none';

    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password_hash: password })
        });

        const result = await response.json();

        if (!response.ok) {
            messageBox.style.display = 'block';
            messageBox.style.backgroundColor = '#fee';
            messageBox.style.color = '#c33';
            messageBox.innerText = result.message || 'Login failed.';
            
            loginBtn.disabled = false;
            loginBtn.innerText = 'Log In';
            return;
        }

        // حفظ البيانات
        localStorage.setItem('user', JSON.stringify(result.data));
        localStorage.setItem('isLoggedIn', "true");

        // رسالة نجاح
        messageBox.style.display = 'block';
        messageBox.style.backgroundColor = '#efe';
        messageBox.style.color = '#3c3';
        messageBox.innerText = 'Login successful! Redirecting...';

        setTimeout(() => {
            window.location.href = 'home⭐️.html'; 
        }, 1500);

    } catch (error) {
        console.error('Login error:', error);
        messageBox.style.display = 'block';
        messageBox.style.backgroundColor = '#fee';
        messageBox.style.color = '#c33';
        messageBox.innerText = 'Network error. check server.';
        
        loginBtn.disabled = false;
        loginBtn.innerText = 'Log In';
    }
});
// دالة محاكاة الدخول عبر السوشيال ميديا
function handleSocialLogin(provider) {
    const messageBox = document.getElementById('message-box');
    
    // 1. إظهار رسالة جاري الاتصال
    messageBox.style.display = 'block';
    messageBox.style.backgroundColor = '#e3f2fd'; // لون أزرق فاتح
    messageBox.style.color = '#0d47a1';
    messageBox.innerText = `Connecting to ${provider}...`;

    // 2. محاكاة وقت الانتظار (ثانية ونصف)
    setTimeout(() => {
        // إنشاء مستخدم وهمي
        const mockUser = {
            _id: 'social_user_123',
            name: `${provider} User`,
            email: `user@${provider.toLowerCase()}.com`,
            phone: '0000000000',
            address: 'Social Login Address'
        };

        // حفظ البيانات وكأننا عملنا Login حقيقي
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isLoggedIn', "true");

        // رسالة نجاح
        messageBox.style.backgroundColor = '#efe';
        messageBox.style.color = '#3c3';
        messageBox.innerText = 'Authenticated successfully!';

        // التوجيه للصفحة التالية
        setTimeout(() => {
            window.location.href = 'home⭐️.html';
        }, 1000);
    }, 1500);
}