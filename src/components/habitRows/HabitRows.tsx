import { ActionIcon, Group, Table, ThemeIcon, rem } from '@mantine/core';
import { IconActivity, IconCircleCheck } from '@tabler/icons-react';
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { entryDisplayDateComparision, monthDisplayDateComparision, reformatDate } from './DateComparisonMonth';

import ProgressLine from './ProgressLine';
import { numMonth } from '../../utils/dateUtills';

type HabitEntry = {
    date: string; // Date in string format (e.g., '14/07/24')
    complete: boolean; // Indicates if the entry is complete
};

type Habit = {
    title: string; // Title of the habit
    description: string; // Description of the habit
    date_created: string; // Date the habit was created (in string format)
    current_streak: number; // Current streak count for the habit
};

type HabitObject = {
    habit: Habit; // The habit object
    entries: HabitEntry[]; // Array of entries associated with the habit
};

type DateObj = {
    day: string;
    date: string;
    month: string;
    year: string;
    full_date: string;
}

// Define the type for the HabitsObj
type HabitsArray = HabitObject[];

interface Props {
    habitObj: HabitObject[];
    habitWeekObj: any;
    habitMonthObj: any;
    deleteHabit: (obj: Habit) => Promise<void>;
    showDate: boolean;
    DateDisplay: DateObj[];
    updateFormAction: (row: HabitObject, entry: HabitEntry, obj: DateObj, title: string) => Promise<void>; 
    MonthDisplay: DateObj[];
}

export const HabitRows: React.FC<Props> = ({habitObj, deleteHabit, showDate, updateFormAction, MonthDisplay, DateDisplay  }) => (
    
    Array.isArray(habitObj) ? habitObj.map((row, rowIndex) => (    
        <Table.Tr key={row.habit.title} >
            <Table.Td className='flex justify-between w-[170px]'>
                <div className='flex'>
                    <IconActivity /> 
                    <p className='mx-1'>{row.habit.title}</p>
                </div>
                <Group gap={0} justify="flex-end">
                    {/* <ActionIcon variant="subtle" color="gray">
                        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon> */}
                    <ActionIcon variant="subtle" color="red" onClick={() => deleteHabit(row.habit)} >
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
            {MonthDisplay.map((obj, dateIndex) => {
                const formattedDate = reformatDate(obj?.full_date || 0);
                return row?.entries && row.entries.map((entry, index) => {
                    const isDateMatched = formattedDate === entry.date;
                    const showComparison = monthDisplayDateComparision(MonthDisplay, index, numMonth) === entryDisplayDateComparision(entry);
                    return (
                        isDateMatched &&
                        <Table.Td key={index + dateIndex} className="!overflow-hidden !px-0">
                            <div className="text-center !px-0">
                                <p className={`${showDate ? 'visible' : 'hidden'} text-xs`}>
                                    {showComparison ? 'true' : 'false'}
                                    {entry.date}
                                </p>
                                <Group
                                    gap="0"
                                    className={`!overflow-hidden !flex !items-center !justify-between m-auto ${entry?.complete && 'animate-pulse'}`}
                                    align="center"
                                >
                                    <ProgressLine entry={entry} row={row} index={index} direction={true} />
                                    <ThemeIcon
                                        key={index}
                                        color={entry?.complete ? '#00FA9A' : 'rgba(228, 230, 240)'}
                                        size={28}
                                        radius="xl"
                                        className="hover:bg-teal-500 transition-all duration-900 !ease-in-out cursor-pointer px-0 mx-0 flex-[0.35]"
                                    >
                                        <IconCircleCheck
                                            style={{ width: rem(34), height: rem(38) }}
                                            onClick={() => updateFormAction(row, entry, obj, row.habit.title)}
                                        />
                                    </ThemeIcon>
                                    <ProgressLine entry={entry} row={row} index={index} direction={false} />
                                </Group>
                            </div>
                        </Table.Td>
                    );
                });
            })}

            <Table.Td className='flex'>
                <p>{row.habit.current_streak}</p>
            </Table.Td>
        </Table.Tr>
    )) : null
)
