function handleRegister() {
    // حفظ حالة الدخول
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userLocation', 'Khartoum, Sudan');
    // الانتقال
    window.location.href = 'home⭐️.html';
}

function togglePassword() {
    const input = document.getElementById('pass');
    if (input.type === "password") input.type = "text";
    else input.type = "password";
}