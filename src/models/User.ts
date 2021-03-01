import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
/** How to use decorators
 *  it's necessary to enable on tsconfig.json file
 *  uncommenting following options:
 *  strictPropertyInitialization: false
 *  experimentalDecorators: true
 *  emitDecoratorMetadata: true
 */
@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        // generate new uuid
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { User };

