import { Button, Grid, NumberInput, Select, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import ConstantsService from "src/services/ConstantsService";
import { useMediaQuery } from "@mantine/hooks";

export function Search() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [org, setOrg] = useState<string | null>("");
  const [role, setRole] = useState<string | null>("");
  const [year, setYear] = useState<number | "">("");

  const [companies, setCompanies] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);

  useEffect(() => {
    console.log('called');
    ConstantsService.getConstants().then((response) => {
      setCompanies(response.data.companies.map((company: any) => company.name));  
      setPositions(response.data.positions.map((position: any) => position.title));
    }); 
  }, []);

  const search = () => {
    //TODO: complete implementation
    console.log(org, role, year);
  };

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
          <Select
            data={positions}
            placeholder="Select role"
            value={role}
            onChange={setRole}
          />
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
