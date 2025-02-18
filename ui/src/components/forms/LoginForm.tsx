import {useForm} from '@mantine/form';
import { TextInput, PasswordInput, Button, Group } from "@mantine/core";
import { useContext } from 'react';
import { Auth } from '../../context/auth';
import {AiOutlineLogin} from 'react-icons/ai';

export function LoginForm() {
 
  const {loginHandler}=useContext(Auth);
  const form=useForm({
    initialValues:{
      email:'',
      password: ''
    }
  });

  return (
    <form onSubmit={form.onSubmit(values=> loginHandler(values))}>
      <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} required/>
      <PasswordInput label="Password" placeholder="Password"  {...form.getInputProps('password')} required/>
      <Group position="center">
        <Button type="submit" className="my-2 mx-auto">
          <AiOutlineLogin/>
          Login
        </Button>
      </Group>
    </form>
  );
}
