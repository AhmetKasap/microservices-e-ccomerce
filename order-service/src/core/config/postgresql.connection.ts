import { TypeOrmModule } from "@nestjs/typeorm"
import 'dotenv/config'
import { OrderEntity } from "src/modules/order/entities/order.entity"

export const postgreDBConnection = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [OrderEntity],
  synchronize: true,}
)