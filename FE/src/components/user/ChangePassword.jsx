import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../utils/axiosInstance.jsx';

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    const toggleShowPassword = (name) => {
        setShowPasswords((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('Mật khẩu mới và mật khẩu xác nhận không khớp.');
            return;
        }

        if (passwords.newPassword.length < 6) {
            setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
            return;
        }

        try {
            const { oldPassword, newPassword } = passwords;
            await instance.post('auth/change-password', { oldPassword, newPassword });
            setSuccess('Đổi mật khẩu thành công! Bạn sẽ được chuyển về trang cá nhân.');
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Đã có lỗi xảy ra. Vui lòng kiểm tra lại mật khẩu cũ.');
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Đổi mật khẩu</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <label htmlFor="oldPassword"className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu cũ
                    </label>
                    <div className="relative">
                        <input
                            type={showPasswords.oldPassword ? 'text' : 'password'}
                            name="oldPassword"
                            id="oldPassword"
                            value={passwords.oldPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <button type="button" onClick={() => toggleShowPassword('oldPassword')} className="text-gray-500">
                                {showPasswords.oldPassword ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="newPassword"className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu mới
                    </label>
                    <div className="relative">
                        <input
                            type={showPasswords.newPassword ? 'text' : 'password'}
                            name="newPassword"
                            id="newPassword"
                            value={passwords.newPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <button type="button" onClick={() => toggleShowPassword('newPassword')} className="text-gray-500">
                                {showPasswords.newPassword ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmPassword"className="block text-sm font-medium text-gray-700 mb-1">
                        Xác nhận mật khẩu mới
                    </label>
                    <div className="relative">
                        <input
                            type={showPasswords.confirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <button type="button" onClick={() => toggleShowPassword('confirmPassword')} className="text-gray-500">
                                {showPasswords.confirmPassword ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center">{success}</p>}

                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Xác nhận
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
