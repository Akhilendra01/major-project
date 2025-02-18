import {Navbar} from '@mantine/core'
export default function Navlink({children}: {children: React.ReactNode}){
    return (
        <Navbar.Section className='mx-auto my-2 text-lg cursor-pointer'>
            {children}
        </Navbar.Section>
    );
}