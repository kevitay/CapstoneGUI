import React from 'react';
import {
    Stack,
    Paper
  } from "@mui/material";


function Footer() {
    //leaving in tech image sources below for discussion on which to include.
    return (
     <>
       <Paper sx={{backgroundColor: '#25252D', color: 'white', padding: '30px'}}> 
        <p>Site created by ASE January 2023 SDI Cohort</p>
        <p>Technology Stack</p>
        <Stack direction='row' alignItems='center' sx={{width: '10%'}} justifyContent='space-between'  flexGrow={1}>
        {/* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JS" width="45" height="45"/> */}
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" alt="React" width="45" height="45" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" alt="MUI" width="45" height="45"/>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain-wordmark.svg" alt="Java" width="45" height="45"/>
        {/* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original-wordmark.svg" alt="Spring" width="45" height="45" /> */}
        {/* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" alt="Docker" width="45" height="45"/> */}
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain-wordmark.svg" alt="Kubernetes" width="45" height="45" />
        {/* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" alt="Intellij" width="45" height="45"/> */}
        {/* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-plain-wordmark.svg" alt="Gradle" width="55" height="55"/> */}
        {/* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" width="45" height="45" /> */}
        {/* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg" alt="Gradle" width="45" height="45"/> */}
        </Stack>
      </Paper>  
    </>    
    );
}

export default Footer;