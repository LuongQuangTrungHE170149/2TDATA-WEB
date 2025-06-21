import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../utils/axiosInstance.jsx';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await instance.get('auth');
                setUser(data);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải thông tin người dùng. Vui lòng thử lại.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { name, avatar } = user;
            const response = await instance.patch('user', { name, avatar });
            
            // Cập nhật lại sessionStorage để Header component có thể cập nhật
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            storedUser.name = response.data.name;
            storedUser.avatar = response.data.avatar;
            sessionStorage.setItem('user', JSON.stringify(storedUser));

            alert('Cập nhật thông tin thành công!');
            // Cân nhắc reload để Header cập nhật, hoặc dùng state management phức tạp hơn
            window.location.reload(); 
        } catch (err) {
            setError('Cập nhật thất bại. Vui lòng thử lại.');
            console.error(err);
        }
    };

    if (loading) {
        return <div className="container mx-auto p-4 text-center">Đang tải...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Trang cá nhân</h1>
            {user && (
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl">
                             {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                user.name?.charAt(0).toUpperCase()
                            )}
                        </div>
                         <input
                            type="text"
                            name="avatar"
                            id="avatar"
                            value={user.avatar || ''}
                            onChange={handleInputChange}
                            placeholder="URL ảnh đại diện"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Tên
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={user.name || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={user.email || ''}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            type="submit"
                            className="w-full flex-1 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Lưu thay đổi
                        </button>
                        <Link
                            to="/change-password"
                            className="w-full flex-1 text-center text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Đổi mật khẩu
                        </Link>
                    </div>
                     {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            )}
        </div>
    );
};

export default Profile; 