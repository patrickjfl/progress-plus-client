import React from 'react';
import {
  Grid,
  Header,
  Segment,
  Sidebar,
  Button,
  Icon,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import LogOutButton from '../components/LogOutButton';
import { useAuthContext } from '../firebaseAuthUtils/useAuthContext';

export default function NavBar({ linksAndTitles }) {
  const { open, setOpen } = useAuthContext();
  return (
    <div>
      <Sidebar
        className='sidebar'
        as={Segment}
        animation='overlay'
        direction='top'
        visible={open}>
        <Grid textAlign='center'>
          <Grid.Row columns={1}>
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Grid.Row columns={linksAndTitles.length + 1}>
            {linksAndTitles.map((object) => (
              <Grid.Column key={object.title} href={object.link}>
                <Header>{object.title}</Header>
              </Grid.Column>
            ))}
            <Grid.Column>
              {/* put in edit profile component or redirect to edit profile page */}
              <LogOutButton />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Icon
            style={{ marginBottom: '4px' }}
            name='arrow up'
            size='big'
            onClick={() => {
              setOpen(!open);
            }}
          />
        </Grid>
      </Sidebar>
    </div>
  );
}
