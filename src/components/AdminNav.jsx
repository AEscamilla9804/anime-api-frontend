import { Link } from 'react-router-dom';

const AdminNav = ({ section }) => {
    const links = [
        { to: '/admin/profile', label: 'Edit Profile', key: 'edit' },
        { to: '/admin/change-password', label: 'Change Password', key: 'password' }
    ];

  return (
    <div className="flex gap-10">
        { links.map(({ to, label, key }) => {
            const isActive = section === key;

            return (
                <Link
                    key={key}
                    to={to}
                    className={`
                        font-bold hover:text-cyan-800
                        ${ isActive ? 'text-cyan-800' : 'text-cyan-600' }
                    `}
                >
                    {label}
                </Link>
            )
        })}
    </div>
  )
}

export default AdminNav;