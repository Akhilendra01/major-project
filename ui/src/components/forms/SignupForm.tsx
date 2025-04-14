import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";

import AuthService from "src/services/AuthService";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

export function SignupForm({ close }: { close: () => void }) {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      dob: "",
      // photo: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    await AuthService.signup(values);
    close();
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}
    >
      <TextInput
        label="Email"
        placeholder="Email"
        required
        {...form.getInputProps("email")}
      />
      <TextInput
        label="Username"
        placeholder="Username"
        required
        {...form.getInputProps("username")}
      />
      <TextInput
        label="Name"
        placeholder="Name"
        required
        {...form.getInputProps("name")}
      />
      <PasswordInput
        label="Password"
        placeholder="Password"
        required
        {...form.getInputProps("password")}
      />
      <DateInput
        label="Date of Birth"
        placeholder="Date input"
        maw={400}
        mx="auto"
        required
        {...form.getInputProps("dob")}
      />

      {/* <FileInput
        label="Profile Picture"
        placeholder="Click to upload"
        className="py-2"
        {...form.getInputProps("photo")}
      /> */}

      <Checkbox label="I agree with t&c" className="my-2" required />
      <Group position="center">
        <Button type="submit" className="my-2 mx-auto">
          Sign Up!
        </Button>
      </Group>
    </form>
  );
}
