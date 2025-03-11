import { Button, Grid, NumberInput, Select, Text } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

const companies = [
  "Google",
  "Microsoft",
  "Meta",
  "Amazon",
  "Morgan Stanley",
  "J P Morgan",
];
const roles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Business Analyst",
  "Financial Analyst",
  "Investment Banker",
];

export function Search() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [org, setOrg] = useState<string | null>("");
  const [role, setRole] = useState<string | null>("");
  const [year, setYear] = useState<number|"">("");

  const search=()=>{
    //TODO: complete implementation
    console.log(org,role,year);
  }

  return (
    <>
      <Text size={20} className="text-center my-2">
        Search Articles
      </Text>
      <Grid className={`${isMobile ? "w-full" : "w-1/2"} mx-auto`} gutter="sm">
        <Grid.Col span={isMobile ? 12 : 3}>
          <Select
            data={companies}
            placeholder="Select company"
            value={org}
            onChange={setOrg}
          />
        </Grid.Col>
        <Grid.Col span={isMobile ? 12 : 3}>
          <Select data={roles} placeholder="Select role" value={role} onChange={setRole}/>
        </Grid.Col>
        <Grid.Col span={isMobile ? 12 : 3}>
          <NumberInput
            min={2000}
            max={new Date().getFullYear()}
            value={year}
            onChange={setYear}
            placeholder="Select year upto"
          />
        </Grid.Col>
        <Grid.Col span={isMobile ? 12 : 3}>
          <Button color="blue" fullWidth onClick={search}>
            Search
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}
