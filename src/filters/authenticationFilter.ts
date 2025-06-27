import { verifyLoggedUser } from "../services/authService";


const authenticationFilter = async(req: any, res: any, next: any) =>{
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Token recebido:', token);
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
   
    try{
        await verifyLoggedUser(token);
        next();
    }catch{
        console.log('Token inválido ou expirado');
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
}
export { authenticationFilter };