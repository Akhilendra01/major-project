import {
  Button,
  Card,
  MultiSelect,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import ContentService, { Profile } from "src/services/ContentService";

import { useForm } from "@mantine/form";
import { useParams } from "react-router";
import { useState } from "react";

interface ProfileFormValues {
  username: string | "";
  firstName: string | "";
  lastName: string | "";
  bio: string | "";
  location: string | "";
  designation: string | "";
  skills: string[];
  batch: number | null;
  branch: string | "";
}

const skillOptions = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Tailwind",
  "TypeScript",
  "Python",
  "C++",
];

export function EditProfile({ profile }: { profile: Profile | null }) {
  const username = useParams().username;
  const [loading, setLoading] = useState(false);
  const form = useForm<ProfileFormValues>({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      bio: "",
      location: "",
      designation: "",
      batch: null,
      branch: "",
      skills: [],
    },
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    values.username = username || "";
    setLoading(true);
    const updatedValues = {
      ...values,
    };

    for (const key in updatedValues) {
      if (updatedValues[key as keyof ProfileFormValues] === "") {
        delete updatedValues[key as keyof ProfileFormValues];
      }
    }
    const res = await ContentService.updateProfile(updatedValues);
    window.location.reload();
    return res;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="bg-white"
      >
        <Title order={2} className="mb-4 text-center">
          Edit Profile
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="First Name"
              placeholder={profile?.firstName || "John"}
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder={profile?.lastName || "Doe"}
              {...form.getInputProps("lastName")}
            />
          </div>

          <TextInput
            label="Designation"
            placeholder={profile?.designation || "Student"}
            {...form.getInputProps("designation")}
          />

          <TextInput
            label="Branch"
            placeholder={profile?.branch || "Computer Science"}
            {...form.getInputProps("branch")}
          />

          <TextInput
            label="Batch"
            placeholder={`${profile?.batch}` || "batch"}
            {...form.getInputProps("batch")}
          />

          <TextInput
            label="Location"
            placeholder={profile?.location || "City, Country"}
            {...form.getInputProps("location")}
          />

          <Textarea
            label="Bio"
            placeholder={profile?.bio || "Tell us about yourself"}
            minRows={3}
            {...form.getInputProps("bio")}
          />

          <MultiSelect
            data={skillOptions}
            label="Skills"
            placeholder="Pick your skills"
            searchable
            clearable
            {...form.getInputProps("skills")}
          />

          <Button type="submit" loading={loading} fullWidth>
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
}
