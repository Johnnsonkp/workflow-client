import { Container, SimpleGrid, Text, rem } from '@mantine/core';

import classes from './features.module.css';
import postgresqlLogo from '../../../public/postgresql.svg'
import railsLogo from '../../../public/rails.svg'
import reactLogo from '../../../public/reactLogo.svg'

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<any>;
  title: string;
  description: string;
}

export function Feature({ imgSrc, title }) {
    return (
      <div className={classes.feature}>
  
        <div className={classes.content}>
            <img 
                src={imgSrc} 
                className={`${title == 'React'? classes.AppLogo  : ''} w-24 h-12`}
            />
        </div>
      </div>
    );
}

const techStack = [
    {
      imgSrc: reactLogo,
      title: 'React',
    },
    {
      imgSrc: railsLogo,
      title: 'Ruby on Rails',
    },
    {
      imgSrc: postgresqlLogo,
      title: 'Postgresql',
    },
  ];

export function ReactRailsFeatures() {
  const items = techStack.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={120} mb={30} size="lg">
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50} className={classes.container}>
        {items}
      </SimpleGrid>
    </Container>
  );
}