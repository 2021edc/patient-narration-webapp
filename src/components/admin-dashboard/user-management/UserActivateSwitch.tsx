import { IAdminUserInfo } from '@/types/api/admin';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import ActivateUserAction from '@/actions/admin-panel/activateuser.action';
import { useState } from 'react';

interface UserActivateSwitchProps {
  userInfo: IAdminUserInfo;
  isCurrentUser: boolean;
}

const UserActivateSwitch = ({
  userInfo,
  isCurrentUser,
}: UserActivateSwitchProps) => {
  const [disableSwitch, setDisableSwitch] = useState(false);

  const handleChange = async (isChecked: boolean) => {
    setDisableSwitch(true);

    // Check if the switch is on or off and perform correct action

    const response = await ActivateUserAction({
      userid: userInfo.user_id,
      activate: isChecked,
    });

    if (response?.success) {
      toast.success(response.message);
    }

    if (response?.error) {
      toast.error(response.error);
      return;
    }
    setDisableSwitch(false);
  };

  return (
    <Switch
      defaultChecked={userInfo.is_user_active}
      onCheckedChange={handleChange}
      disabled={disableSwitch || isCurrentUser}
    ></Switch>
  );
};

export default UserActivateSwitch;
