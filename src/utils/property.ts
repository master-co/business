import { ClassType } from '../interfaces/class-type';
import 'reflect-metadata';

export function definePropertyMetadata(
    target: Object,
    name: string,
    columnPropOptions: { key: string, [otherKey: string]: any },
    options?: {
        type?: Function
    }
): void {
    const type = options?.type ?? Reflect.getMetadata('design:type', target, name);
    const newProperty = Object.assign(
        columnPropOptions,
        {
            name,
            type
        }
    );
    const metaData = Reflect.getOwnMetadata(columnPropOptions.key, target);
    !metaData
        ? Reflect.defineMetadata(
            columnPropOptions.key,
            [newProperty],
            target
        )
        : metaData.push(newProperty);
};

export function getPropertyMetadata<T>(cls: ClassType<T> | Function, type?: string): any[] {
    const metadata = [];

    let target = cls.prototype;
    while (target !== Object.prototype) {
        const childFields = (Reflect.getOwnMetadata(type, target) || [])
            .filter(eachChildField => metadata.every(eachMetadata => eachMetadata.name !== eachChildField.name));

        metadata.push(...childFields);

        target = Object.getPrototypeOf(target);
    }

    return metadata;
};