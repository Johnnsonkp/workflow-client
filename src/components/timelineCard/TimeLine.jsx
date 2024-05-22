import { Group, Paper, Text, Timeline } from '@mantine/core';
import { IconGitBranch, IconGitCommit, IconGitPullRequest, IconMessageDots } from '@tabler/icons-react';

function TimeLineCardDIsplay() {
    return (
        <Paper withBorder radius="md" p="xs" key={1} className='!shadow-md'>
        <Group className='!justify-center !align-end'>
        <Timeline active={0} bulletSize={22} lineWidth={1}>
            {/* <Text fz="lg" className={'!mb-5'} fw={500}>
                Monthly Targets
              </Text> */}
            <Timeline.Item size={'sm'} bullet={<IconGitBranch size={10} />} title="Complete Productivity App">
                <Text c="dimmed" size="xs">You&apos;ve created new branch</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<IconGitCommit size={10} />} title="Begin shopify dev freelancing">
                <Text c="dimmed" size="xs">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
            </Timeline.Item>

            <Timeline.Item title="Beging making dev content" bullet={<IconGitPullRequest size={10} />} lineVariant="dashed">
                <Text c="dimmed" size="xs">You&apos;ve submitted a pull request</Text>
            </Timeline.Item>

        </Timeline> 
        </Group>
        </Paper>
    );   
}

export default TimeLineCardDIsplay