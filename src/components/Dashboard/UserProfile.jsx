import { useEffect, useState } from 'react';

export default function UserProfile() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            console.log("fetching");
            const fetchUserData = async () => {
                try {
                    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    const { name } = data;
                    console.log(data);
                    console.log(name);
                    setUserName(name);
                } catch (error) {
                    console.log('Error fetching user data:', error);
                }
            };
            fetchUserData();
        }
    }, []);

    return (
        <div className="flex items-center">
            <img
                src="/userProfile.png"
                alt="User Icon"
                className="w-10 h-10 rounded-full mr-2"
            />
            <span className="font-medium">{userName}</span>
            {/* <span className="font-medium">John Doe</span> */}
        </div>
    );
}
