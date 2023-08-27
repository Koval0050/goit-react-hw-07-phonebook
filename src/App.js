import './style.css';
import { fetchContacts } from 'api/api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectisLoading } from 'redux/reducer';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Loader from 'components/Loader/Loader';

export const App = () => {
  const isLoading = useSelector(selectisLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      <ContactForm />
      {!isLoading ? <ContactList /> : <Loader />}
    </div>
  );
};
