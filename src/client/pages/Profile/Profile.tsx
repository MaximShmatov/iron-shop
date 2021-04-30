import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './Profile.module.sass';


export default function Profile() {
  const isAuth = useSelector(({ auth }) => auth.isAuth);
  const profile = {
    name: 'Administrator',
    role: 'Admin',
    phone: '+7 888 444 40 10',
    email: 'admin@qex.ru',
    imgLink: 'img/profile/admin.png',
    imgAlt: 'Admin Icon',
  };

  return isAuth ? (
    <main className={styles.page}>
      <h1 className={styles.title}>User Profile</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <td colSpan={2}>
              <img className={styles.image} alt={profile.imgAlt} src={profile.imgLink} />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <td>Role:</td>
            <td>{profile.role}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>{profile.phone}</td>
          </tr>
          <tr>
            <td>E-mail:</td>
            <td>{profile.email}</td>
          </tr>
        </tbody>
      </table>
    </main>
  ) : (
    <Redirect to="/signin" />
  );
}