import * as  express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { getEnvironmentVariables } from './environments/env';
import TalentCategoryRouter from './routers/TalentCategoryRouter';
import TalentRouter from './routers/TalentRouter';
import TalentPortfolioRouter from './routers/TalentPortfolioRouter';
import AdBannerRouter from './routers/AdBannerRouter';
import AdminRouter from './routers/AdminRouter';
import WorkRouter from './routers/WorkRouter';


export class Server {
    public app:express.Application = express();

    constructor(){

        // other 
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations(){
        this.connectMongodb();
        this.configureBodyParser();
    }

    connectMongodb(){
        const databaseUrl = getEnvironmentVariables().db_url;
        mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
            console.log('mongoDb Connected');
        });
    }

    configureBodyParser(){
        this.app.use(bodyParser.urlencoded({extended:true}));
        //this.app.use(app.bodyParser({limit: '50mb'}));
        //this.app.use(bodyParser.json());
    }

    setRoutes(){
        //this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/api/src/uploads', express.static('src/uploads'));
        this.app.use('/api/talent_category', TalentCategoryRouter);
        this.app.use('/api/talent', TalentRouter);
        this.app.use('/api/talent_portfolio', TalentPortfolioRouter);
        this.app.use('/api/banner', AdBannerRouter);
        this.app.use('/api/admin', AdminRouter);
        this.app.use('/api/work', WorkRouter);
    }

    error404Handler(){
        this.app.use((req,res)=>{
            res.status(200).json({
                message:'Not Found !'+ getEnvironmentVariables().jwt_secret,
                status_code:200
            });
        }) 
    }

    handleErrors(){
        this.app.use((error, req, res, next)=>{
            const errorStatus = req.errorStatus || 200;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code:errorStatus
            });
        })
    }





}