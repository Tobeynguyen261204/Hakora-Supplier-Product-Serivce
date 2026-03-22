export const FIELD_ROLES_KEY = 'field_roles';

export const FieldRoles = (...roles: string[]): PropertyDecorator => {
    return (target: object, propertyKey: string | symbol) => {
        Reflect.defineMetadata(FIELD_ROLES_KEY, roles, target, propertyKey);
    };
};
