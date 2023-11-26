import { Button, Container, Stack, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab'
import Page from "src/components/Page";
import useUpload from "./hooks/useUpload";

export default function Upload(){
    const { 
        inputRef, 
        file,
        image,
        loading,
        handleClickUpload,
        handleChangeFile,
        onUpload
    } = useUpload()

    return(
        <Page 
            title='Conversor de Imgens'
            sx={{
                backgroundColor: 'wheat',
                height: '100vh'
            }} 
        >
            <Container 
                maxWidth='lg'
                sx={{
                    height: '100%'
                }}
            >
                <Stack 
                    alignItems='center' 
                    justifyContent='center'
                    height='100%'
                    spacing={2}
                >
                    <Typography variant="h3" textAlign='center'>
                        Converter Imagem para PDF
                    </Typography>
                    {image &&
                        <img alt='upload' height='100px' width='100px' src={image}></img>
                    }
                    <Typography 
                        variant="h6"
                        sx={{
                            color: !file ? 'red' : undefined
                        }}
                        textAlign='center'
                    >
                        {file ? `Arquivo selecionado: ${file.name}` : `Nenhum arquivo selecionado`}
                    </Typography>
                    <Button
                        onClick={handleClickUpload}
                    >
                        SELECIONE O ARQUIVO
                    </Button>
                    <input 
                        type="file" 
                        hidden 
                        ref={inputRef} 
                        accept="image/*"
                        onChange={handleChangeFile}
                    />
                    <LoadingButton
                        disabled={!file}
                        variant="contained"
                        onClick={onUpload}
                        loading={loading}
                    >
                        CONVERTER
                    </LoadingButton>
                </Stack>
            </Container>
        </Page>
    )
}