import React from 'react'
import { 
    Window,
    WindowContent,
    WindowHeader,
    Button,
    Toolbar,
    Panel,
  } from 'react95';
  import styled from 'styled-components';

  const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  justify-content: center;
  .window-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ___CSS_0___;
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .window {
    width: 400px;
    height: 600px;
    
  }
  .window:nth-child(2) {
    margin: 2rem;
  }
  .window-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;
const AboutWindow = () => {
    return (
        <Wrapper>
            <Window className='window'>
                <WindowHeader className='window-header'>
                    <span>About.exe</span>
                    <Button>
                        <span className='close-icon' />
                    </Button>
                </WindowHeader>
                <Toolbar>
                    <Button variant='menu' size='sm'>
                        File
                    </Button>
                    <Button variant='menu' size='sm'>
                        Edit
                    </Button>
                    <Button variant='menu' size='sm' disabled>
                        Save
                    </Button>
                </Toolbar>
                <WindowContent>
                    <Panel>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    </Panel>
                </WindowContent>
            </Window>
        </Wrapper>
    )
}

export default AboutWindow
