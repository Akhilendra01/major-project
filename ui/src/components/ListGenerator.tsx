import { List, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { UserData } from "src/interfaces";

export default function ListGenerator({ data }: { data: UserData }) {
  return (
    <List>
      {data.friends && data.friends.length === 0 && (
        <Text>.....Nothing to show in here for now.....</Text>
      )}
      {data.friends &&
        data.friends.map((item) => (
          <List.Item key={item}>
            <Link to={`/@/${item}`} className="no-underline cursor-pointer">@{item}</Link>
          </List.Item>
        ))}
    </List>
  );
}
