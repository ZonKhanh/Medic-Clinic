import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path';
import { UserService } from './modules/users/user.service';
import { UserController } from './modules/users/user.controller';
import { User, UserSchema } from './modules/users/schema/user.schema';
import { isAuthenticated } from './app.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { FileUploadModule } from './modules/media/file-upload.module';
import { FileUploadService } from './modules/media/file-upload.service';

@Module({
  imports: [
    AuthModule,
    FileUploadModule, ///
    MongooseModule.forRoot('mongodb://localhost:27017/medic-clinic'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      }),
    }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],

  controllers: [AppController, UserController],
  providers: [AppService, UserService, FileUploadService],
})

export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     // .apply(isAuthenticated) // Áp dụng middleware isAuthenticated
  //     // .exclude( // Định nghĩa route để loại trừ
  //     //   { path: 'api/v1/auth/', method: RequestMethod.ALL }, // Loại trừ tất cả các method cho route auth
  //     // )
  //     // .forRoutes('*'); // Áp dụng middleware cho tất cả các route khác
  // }
}
