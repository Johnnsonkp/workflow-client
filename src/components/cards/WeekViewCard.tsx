import { Badge, Card, Group, Text } from '@mantine/core';

interface Iobj {
    day?: string;
    date?: number | undefined;
    month?: number;
    year?: number;
}

interface Props {
    obj?: Iobj[] | any;
}

const WeekViewCard: React.FC<Props> = ({obj}) => {
  return (
    <div className=''>
        <Card withBorder padding="sm" radius="md" className='w-[200px] h-[180px]'>
        <Group justify="space-between">
            <Badge>12 days left</Badge>
        </Group>

        <Text fz="lg" fw={500} mt="md">
            {obj.date}
        </Text>
        <Text fz="sm" c="dimmed" mt={5}>
            Form context management, Switch, Grid and Indicator components improvements, new hook and
            10+ other changes
        </Text>

        <Text c="dimmed" fz="sm" mt="md">
            Tasks completed:{' '}
            <Text span fw={500} c="bright">
            23/36
            </Text>
        </Text>

        </Card>
    </div>
  );
}

export default WeekViewCard