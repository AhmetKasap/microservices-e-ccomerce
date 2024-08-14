import { TypeOrmModule } from "@nestjs/typeorm"
import 'dotenv/config'
import { PaymentEntity } from "src/modules/payment/model/PaymentEntity"

export const postgreDBConnection = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [PaymentEntity],
  synchronize: true,}
)