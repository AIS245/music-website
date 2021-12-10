import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import ReactAudioPlayer from 'react-audio-player';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({

    maincomponent : {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '1px 1px 5px 5px #b5b4b2',
        padding: '30px',
        marginTop: '5%',
        marginBottom: '5%',
        height: '60vh',
        overflow: 'scroll'      
    },

    addSongComponent: {
       // border: '1px solid black',
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '20px',
        boxShadow: '1px 1px 5px 5px grey'
    },
    mainHeading: {
        backgroundColor : '#04AA6D',
        padding: '20px',
        fontSize: '24px',
        color: 'white',
        fontWeight: 'bold'
    },
    noSongs: {
        fontSize: '22px',
        color: 'brown',
        fontWeight: '800',
        padding: '20px',
    },
    addSongButton: {
        backgroundColor: 'brown',
        color: 'white',
        fontWeight: '600',
        "&:hover": {
            backgroundColor: 'brown',
            color: 'white',
            fontWeight: '600',
        }
    },
    songTitle: {
        textAlign: 'left',
        color: 'mediumblue',
        fontWeight: '600'
    },
    oneSongComponent: {
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '20px'
    },
    lightext: {
        marginTop: '-10px',
        opacity: '0.5',
        textAlign: 'left'
    }
   

}))


function Homepage() {
    const classes = useStyles();

    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState();


    const setSongObject = (song) => {

        let name = song.name;
        let type = song.type;
        getBase64(song).then((base) => {
            let obj = {
                "name": name,
                "type": type,
                "base64": base
            }
            setSelectedSong("");
            setSongs([...songs, obj]);
            
        });
    }

    const onFileChange = (event) => {
        setSelectedSong(event.target.files[0]);
    }

    const onFileUpload = () => {
        setSongObject(selectedSong);
    }

    const getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }

    return (
        <div>
            <div className={classes.mainHeading}>Songs Library Application</div>
        <div className={classes.maincomponent}>
           {songs.length === 0 ? 
                <div>
                    <p className={classes.noSongs}>No Songs Available!!!!</p>
                </div> 
                :   
                <div>
                    {
                        
                        songs.map((s, index) => 
                        <div className={classes.oneSongComponent}>
                            <div className={classes.songTitle}>
                                {index+1}.&nbsp;&nbsp;{s.name}
                            </div>
                            <ReactAudioPlayer
                                src={s.base64}
                                //autoPlay
                                controls
                            />
                        </div>
                        )
                    }

                </div>
            }
            <div className={classes.addSongComponent}>
                <p className={classes.lightext}>Do you want to add songs ?</p>
                <input type = "file" onChange={(e) => onFileChange(e)} /><br /><br />
                <Button 
                    variant="contained" 
                    onClick = { () => {onFileUpload()}}
                    className={classes.addSongButton}
                    disabled = {selectedSong? false: true}
                >
                    Add Song
                </Button>
            </div>
        </div>
        </div>
    );
}

export default Homepage;