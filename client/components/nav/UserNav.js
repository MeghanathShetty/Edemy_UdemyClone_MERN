import Link from 'next/link';

const UserNav = () => {
  return (
    <div className='nav flex-column nav-pills mt-2'>
      <Link className='nav-link active' href="/user" passHref>
        Dashboard
      </Link>
    </div>
  );
};

export default UserNav;
