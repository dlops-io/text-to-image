import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';


import DataService from "../../services/DataService";
import { BASE_API_URL } from "../../services/Common";
import styles from './styles';


const Home = (props) => {
    const { classes } = props;

    console.log("================================== Home ======================================");


    // Component States
    const [text, setText] = useState("");
    const [outputs, setOutputs] = useState([]);

    // Setup Component
    useEffect(() => {

    }, []);

    // Handlers
    const handleOnImageClick = () => {
        console.log(text)
        DataService.Text2Image({ "text": text })
            .then(function (response) {
                console.log(response.data);
                var ops = [...outputs];
                setOutputs([]);
                //ops.push(response.data);
                ops.splice(0, 0, response.data);
                setOutputs(ops);
            })
    }



    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth={false} className={classes.container}>
                    <Grid container spacing={8}>
                        <Grid item md={5}>
                            <br />
                            <Typography>
                                Enter some text and click the Image button
                            </Typography>
                            <br />
                            <TextField

                                label="Text for Image Generation"
                                multiline
                                maxRows={4}
                                variant="outlined"
                                fullWidth
                                value={text}
                                onChange={(event) => setText(event.target.value)}
                            />
                            <br />
                            <br />
                            <br />
                            <Icon className={classes.stopRecording} onClick={() => handleOnImageClick()}>image</Icon>
                        </Grid>
                        <Grid item md={7}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Text</TableCell>
                                            <TableCell>Image</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {outputs && outputs.map((item, idx) =>
                                            <TableRow key={idx}>

                                                <TableCell>{item.text}</TableCell>
                                                <TableCell>
                                                    <img src={BASE_API_URL + "/get_image?path=" + item.image_path}></img>
                                                </TableCell>
                                            </TableRow>
                                        )}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* {outputs && outputs.map((item, idx) =>
                                
                            )} */}
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Home);