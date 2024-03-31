import useAuthCheck from "../hooks/use_auth_check";
import { Link, useNavigate } from "react-router-dom";

import {
    Center,
    Container,
    Title,
    Paper,
    Text,
  } from "@mantine/core";

const Home = () => {
    const { isLoading } = useAuthCheck();
    const navigate = useNavigate();
    if (isLoading) navigate('/dashboard');

    return (
        // nav bar with links to login and dashboard pages
        <div>
            <Paper padding="lg" shadow="xs" className="background-gradient" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#6C63FF', width: '100%' }}>
                <Container size="lg" style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'white', marginRight: '15px' }}>Login</Link>
                    <Link to="/sign_up" style={{ textDecoration: 'none', color: 'white' }}>Register</Link>
                </Container>
            </Paper>
            <Center className="w-screen h-screen background-gradient">
                <div style={{ textAlign: 'center' }}>
                    <Title ta="center" className="font-black">
                        Reptile Tracker!
                    </Title>
                    <Text c="white" style={{padding: '30px'}}>
                        Welcome to Reptile Tracker! This is a simple app to help you keep track of your reptiles. You can use Reptile Tracker to create husbandry schedules, feeding schedules, and more. Get started by creating an account or logging in!
                    </Text>
                </div>
            </Center>
        </div>
    );
}

export default Home;