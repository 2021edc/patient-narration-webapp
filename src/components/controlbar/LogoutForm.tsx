import signoutAction from '@/actions/auth/signout.action';
import FormSubmit from '@/atoms/FormSubmit';

const LogoutForm = () => {
  return (
    <form
      action={signoutAction}
      className="my-2 flex flex-col items-center justify-center py-2"
    >
      <FormSubmit className="!py-1">Log Out</FormSubmit>
    </form>
  );
};

export default LogoutForm;
