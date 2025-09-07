import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// 🎨 Objek untuk menampung semua gaya CSS
const styles = {
    loginPageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3c72, #2a5298)', // gradasi modern
        color: 'white',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box',
    },
    h2: {
        fontSize: '2.2em',
        marginBottom: '25px',
        color: '#ffffff',
        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '400px',
        backdropFilter: 'blur(10px)', // efek kaca
    },
    formDiv: {
        marginBottom: '20px',
        textAlign: 'left',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '0.95em',
        color: '#e0e0e0',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #61dafb',
        borderRadius: '8px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#fff',
        fontSize: '1em',
        outline: 'none',
        transition: '0.3s ease',
    },
    button: {
        backgroundColor: '#61dafb',
        color: '#282c34',
        padding: '12px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        width: '100%',
        marginTop: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
    buttonHover: {
        backgroundColor: '#4fa3d7',
        transform: 'scale(1.05)',
    },
    registerText: {
        marginTop: '20px',
        color: '#f1f1f1',
        fontSize: '0.9em',
    },
    registerLink: {
        color: '#61dafb',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginLeft: '5px',
    }
};

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isHovered, setIsHovered] = useState(false); 
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/login",
                { email, password }
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert("Login successful!");
            navigate("/");
        } catch (error) {
            let msg = "login gagal. periksa kembali password anda";
            if (error.response && error.response.data && (error.response.data.message || error.response.data.msg)) {
                msg = error.response.data.message || error.response.data.msg;
            }
            setErrorMsg(msg);
        }
    };

    const buttonStyle = {
        ...styles.button,
        ...(isHovered ? styles.buttonHover : null)
    };

    return (
        <div style={styles.loginPageContainer}>
            <h2 style={styles.h2}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formDiv}>
                    <label style={styles.label}>Email:</label>
                    <input
                        style={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.formDiv}>
                    <label style={styles.label}>Password:</label>
                    <input
                        style={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMsg && (
                    <div style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</div>
                )}
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Login
                </button>
            </form>
            <div style={styles.registerText}>
                <span>Belum punya akun?</span>
                <Link to="/register" style={styles.registerLink}>Daftar di sini</Link>
            </div>
        </div>
    );
}

export default LoginPage;
