/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthHashController } from './controllers/auth-hash';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './controllers/auth';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BillingController } from './controllers/billing';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoriesController } from './controllers/categories';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryCreateController } from './controllers/category-create';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryRemoveController } from './controllers/category-remove';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryUpdateController } from './controllers/category-update';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryController } from './controllers/category';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CompanyUpdateController } from './controllers/company-update';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CompanyController } from './controllers/company';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DayStatsController } from './controllers/day-stats';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GeneralController } from './controllers/general';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ItemCreateController } from './controllers/item-create';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ItemRemoveController } from './controllers/item-remove';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ItemUpdateController } from './controllers/item-update';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ItemController } from './controllers/item';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ItemsController } from './controllers/items';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { KController } from './controllers/k';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MethodCreateController } from './controllers/method-create';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MethodDeleteController } from './controllers/method-delete';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MethodUpdateController } from './controllers/method-update';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MethodController } from './controllers/method';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MethodsController } from './controllers/methods';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OController } from './controllers/o';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrderReturnController } from './controllers/order-return';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PeriodStatsController } from './controllers/period-stats';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PublicCompanyController } from './controllers/public-company';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RegistrationController } from './controllers/registration';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TableCreateController } from './controllers/table-create';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TableDeleteController } from './controllers/table-delete';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TableUpdateController } from './controllers/table-update';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TablesController } from './controllers/tables';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserCreateController } from './controllers/user-create';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserDeleteController } from './controllers/user-delete';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserUpdateController } from './controllers/user-update';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './controllers/user';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './controllers/users';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WhoamiController } from './controllers/whoami';
import { expressAuthentication } from './authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "IRate": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "perMonth": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICompany": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "tin": {"dataType":"string","required":true},
            "login": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "currencySymbol": {"dataType":"string"},
            "currency_symbol": {"dataType":"string"},
            "timezone": {"dataType":"string"},
            "lang": {"dataType":"string","required":true},
            "utcDiff": {"dataType":"double"},
            "balance": {"dataType":"double"},
            "rateId": {"dataType":"double"},
            "created": {"dataType":"string"},
            "nextPayment": {"dataType":"string"},
            "perMonth": {"dataType":"double"},
            "rate": {"ref":"IRate"},
            "langs": {"dataType":"array","array":{"dataType":"string"}},
            "phone": {"dataType":"string"},
            "instagram": {"dataType":"string"},
            "google_maps_link": {"dataType":"string"},
            "address": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EPaymentStatuses": {
        "dataType": "refEnum",
        "enums": ["new","paid","error"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EPaymentTypes": {
        "dataType": "refEnum",
        "enums": ["deposit","withdraw"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPayment": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "date": {"dataType":"string","required":true},
            "status": {"ref":"EPaymentStatuses","required":true},
            "amount": {"dataType":"double","required":true},
            "companyId": {"dataType":"double","required":true},
            "type": {"ref":"EPaymentTypes","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICategory": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "company_id": {"dataType":"double"},
            "sort": {"dataType":"double"},
            "translations": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"n":{"dataType":"string"},"t":{"dataType":"string"},"l":{"dataType":"string"}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITranslate": {
        "dataType": "refObject",
        "properties": {
            "l": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
            "n": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
            "t": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVariantOrOptionForPosition": {
        "dataType": "refObject",
        "properties": {
            "n": {"dataType":"string"},
            "p": {"dataType":"double"},
            "q": {"dataType":"double"},
            "t": {"dataType":"array","array":{"dataType":"refObject","ref":"ITranslate"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EPriority": {
        "dataType": "refEnum",
        "enums": ["FIRST","SECOND"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPositionForOrder": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "n": {"dataType":"string"},
            "p": {"dataType":"double"},
            "crt": {"dataType":"double"},
            "f": {"dataType":"double"},
            "t": {"dataType":"array","array":{"dataType":"refObject","ref":"ITranslate"}},
            "v": {"ref":"IVariantOrOptionForPosition"},
            "o": {"dataType":"array","array":{"dataType":"refObject","ref":"IVariantOrOptionForPosition"}},
            "c": {"dataType":"string"},
            "i": {"dataType":"double"},
            "d": {"dataType":"double"},
            "cat": {"dataType":"double","required":true},
            "pr": {"ref":"EPriority"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrder": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "n": {"dataType":"double"},
            "t": {"dataType":"double","required":true},
            "p": {"dataType":"array","array":{"dataType":"refObject","ref":"IPositionForOrder"},"required":true},
            "c": {"dataType":"string","required":true},
            "crt": {"dataType":"double"},
            "d": {"dataType":"double"},
            "f": {"dataType":"double"},
            "m": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "company": {"dataType":"double"},
            "cat": {"dataType":"double"},
            "c": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"string"}]},
            "s": {"dataType":"double"},
            "n": {"dataType":"string"},
            "p": {"dataType":"double"},
            "d": {"dataType":"string"},
            "i": {"dataType":"string"},
            "a": {"dataType":"boolean"},
            "h": {"dataType":"boolean"},
            "v": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"p":{"dataType":"double"},"n":{"dataType":"string"}}}},
            "o": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"p":{"dataType":"double"},"n":{"dataType":"string"}}}},
            "t": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"n":{"dataType":"string"},"t":{"dataType":"string"},"l":{"dataType":"string"}}}},
            "vt": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"n":{"dataType":"string"},"t":{"dataType":"string"},"l":{"dataType":"string"}}}}},
            "ot": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"n":{"dataType":"string"},"t":{"dataType":"string"},"l":{"dataType":"string"}}}}},
            "f": {"dataType":"string"},
            "fChanged": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAllPositionsForKitchen": {
        "dataType": "refObject",
        "properties": {
            "tab": {"dataType":"double"},
            "c": {"dataType":"string"},
            "oc": {"dataType":"string"},
            "i": {"dataType":"double"},
            "cat": {"dataType":"double"},
            "crt": {"dataType":"double"},
            "ocrt": {"dataType":"double"},
            "f": {"dataType":"double"},
            "n": {"dataType":"string"},
            "t": {"ref":"ITranslate"},
            "v": {"ref":"IVariantOrOptionForPosition","required":true},
            "o": {"dataType":"array","array":{"dataType":"refObject","ref":"IVariantOrOptionForPosition"},"required":true},
            "on": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMethod": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPublicResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "tin": {"dataType":"string","required":true},
            "login": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "currencySymbol": {"dataType":"string"},
            "currency_symbol": {"dataType":"string"},
            "timezone": {"dataType":"string"},
            "lang": {"dataType":"string","required":true},
            "utcDiff": {"dataType":"double"},
            "balance": {"dataType":"double"},
            "rateId": {"dataType":"double"},
            "created": {"dataType":"string"},
            "nextPayment": {"dataType":"string"},
            "perMonth": {"dataType":"double"},
            "rate": {"ref":"IRate"},
            "langs": {"dataType":"array","array":{"dataType":"string"}},
            "phone": {"dataType":"string"},
            "instagram": {"dataType":"string"},
            "google_maps_link": {"dataType":"string"},
            "address": {"dataType":"string"},
            "categoriesWithPositions": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"i":{"dataType":"array","array":{"dataType":"refObject","ref":"IItem"},"required":true},"t":{"dataType":"array","array":{"dataType":"refObject","ref":"ITranslate"}},"c":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ETableType": {
        "dataType": "refEnum",
        "enums": ["table_s","table_c","wall","flower","door","window","kitchen","grass","pavilion","chair","info","trash","wc","bar","play","music","tree","light","storage"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITable": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "number": {"dataType":"double"},
            "name": {"dataType":"string"},
            "x": {"dataType":"double","required":true},
            "y": {"dataType":"double","required":true},
            "for_order": {"dataType":"boolean","required":true},
            "w": {"dataType":"double","required":true},
            "h": {"dataType":"double","required":true},
            "type": {"ref":"ETableType","required":true},
            "company_id": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EUserTypes": {
        "dataType": "refEnum",
        "enums": ["admin","personal","manager","kitchen"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUser": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "login": {"dataType":"string"},
            "password": {"dataType":"string"},
            "type": {"ref":"EUserTypes"},
            "company_id": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IWhoAmI": {
        "dataType": "refObject",
        "properties": {
            "company": {"dataType":"nestedObjectLiteral","nestedProperties":{"timezone":{"dataType":"string","required":true},"langs":{"dataType":"array","array":{"dataType":"string"}},"lang":{"dataType":"string","required":true},"symbol":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"title":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"required":true},
            "user": {"dataType":"nestedObjectLiteral","nestedProperties":{"login":{"dataType":"string","required":true},"type":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/auth-hash',
            ...(fetchMiddlewares<RequestHandler>(AuthHashController)),
            ...(fetchMiddlewares<RequestHandler>(AuthHashController.prototype.auth)),

            function AuthHashController_auth(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"hash":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthHashController();


              const promise = controller.auth.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.auth)),

            function AuthController_auth(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"login":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.auth.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/billing/update-company-info',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(BillingController)),
            ...(fetchMiddlewares<RequestHandler>(BillingController.prototype.updateCompanyInfo)),

            function BillingController_updateCompanyInfo(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BillingController();


              const promise = controller.updateCompanyInfo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/billing/make-payment',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(BillingController)),
            ...(fetchMiddlewares<RequestHandler>(BillingController.prototype.makePayment)),

            function BillingController_makePayment(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"amount":{"dataType":"double","required":true}}},
                    undefined: {"in":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BillingController();


              const promise = controller.makePayment.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/billing/payments-list',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(BillingController)),
            ...(fetchMiddlewares<RequestHandler>(BillingController.prototype.paymentsList)),

            function BillingController_paymentsList(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BillingController();


              const promise = controller.paymentsList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/billing/make-monthly-payment-and-update-company',
            ...(fetchMiddlewares<RequestHandler>(BillingController)),
            ...(fetchMiddlewares<RequestHandler>(BillingController.prototype.makeMonthlyPaymentAndUpdateCompany)),

            function BillingController_makeMonthlyPaymentAndUpdateCompany(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"companyId":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BillingController();


              const promise = controller.makeMonthlyPaymentAndUpdateCompany.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/billing/success-payment',
            ...(fetchMiddlewares<RequestHandler>(BillingController)),
            ...(fetchMiddlewares<RequestHandler>(BillingController.prototype.successPayment)),

            function BillingController_successPayment(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BillingController();


              const promise = controller.successPayment.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/billing/failed-payment',
            ...(fetchMiddlewares<RequestHandler>(BillingController)),
            ...(fetchMiddlewares<RequestHandler>(BillingController.prototype.failedPayment)),

            function BillingController_failedPayment(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BillingController();


              const promise = controller.failedPayment.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/categories',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriesController.prototype.categories)),

            function CategoriesController_categories(request: any, response: any, next: any) {
            const args = {
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CategoriesController();


              const promise = controller.categories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/category-create',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryCreateController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryCreateController.prototype.create)),

            function CategoryCreateController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ICategory"},
                    undefined: {"in":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CategoryCreateController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/category-remove',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryRemoveController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryRemoveController.prototype.categoryRemove)),

            function CategoryRemoveController_categoryRemove(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CategoryRemoveController();


              const promise = controller.categoryRemove.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/category-update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryUpdateController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryUpdateController.prototype.update)),

            function CategoryUpdateController_update(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ICategory"},
                    undefined: {"in":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CategoryUpdateController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/category',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.category)),

            function CategoryController_category(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CategoryController();


              const promise = controller.category.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/company-update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CompanyUpdateController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyUpdateController.prototype.update)),

            function CompanyUpdateController_update(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"ICompany"},
                    undefined: {"in":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CompanyUpdateController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/company',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(CompanyController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyController.prototype.company)),

            function CompanyController_company(request: any, response: any, next: any) {
            const args = {
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CompanyController();


              const promise = controller.company.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/day-stats',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(DayStatsController)),
            ...(fetchMiddlewares<RequestHandler>(DayStatsController.prototype.dayStats)),

            function DayStatsController_dayStats(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"day":{"dataType":"string","required":true}}},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new DayStatsController();


              const promise = controller.dayStats.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/',
            ...(fetchMiddlewares<RequestHandler>(GeneralController)),
            ...(fetchMiddlewares<RequestHandler>(GeneralController.prototype.search)),

            function GeneralController_search(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GeneralController();


              const promise = controller.search.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/item-create',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(ItemCreateController)),
            ...(fetchMiddlewares<RequestHandler>(ItemCreateController.prototype.create)),

            function ItemCreateController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IItem"},
                    undefined: {"in":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ItemCreateController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/item-remove',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(ItemRemoveController)),
            ...(fetchMiddlewares<RequestHandler>(ItemRemoveController.prototype.delete)),

            function ItemRemoveController_delete(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"itemId":{"dataType":"double","required":true}}},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ItemRemoveController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/item-update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(ItemUpdateController)),
            ...(fetchMiddlewares<RequestHandler>(ItemUpdateController.prototype.update)),

            function ItemUpdateController_update(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IItem"},
                    undefined: {"in":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ItemUpdateController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/item',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(ItemController)),
            ...(fetchMiddlewares<RequestHandler>(ItemController.prototype.item)),

            function ItemController_item(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"itemId":{"dataType":"double","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ItemController();


              const promise = controller.item.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/items',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(ItemsController)),
            ...(fetchMiddlewares<RequestHandler>(ItemsController.prototype.items)),

            function ItemsController_items(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IItem"},
                    undefined: {"in":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ItemsController();


              const promise = controller.items.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/k/list-categories-for-filter',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(KController)),
            ...(fetchMiddlewares<RequestHandler>(KController.prototype.listCategoriesForFilter)),

            function KController_listCategoriesForFilter(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new KController();


              const promise = controller.listCategoriesForFilter.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/k/list-positions-by-categories',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(KController)),
            ...(fetchMiddlewares<RequestHandler>(KController.prototype.listPositionsByCategories)),

            function KController_listPositionsByCategories(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new KController();


              const promise = controller.listPositionsByCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/k/done-position',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(KController)),
            ...(fetchMiddlewares<RequestHandler>(KController.prototype.donePosition)),

            function KController_donePosition(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"doneTime":{"dataType":"double","required":true},"positionIndex":{"dataType":"double","required":true},"orderNumber":{"dataType":"double","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new KController();


              const promise = controller.donePosition.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/k/restart-position',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(KController)),
            ...(fetchMiddlewares<RequestHandler>(KController.prototype.restartPosition)),

            function KController_restartPosition(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"positionIndex":{"dataType":"double","required":true},"orderNumber":{"dataType":"double","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new KController();


              const promise = controller.restartPosition.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/method-create',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(MethodCreateController)),
            ...(fetchMiddlewares<RequestHandler>(MethodCreateController.prototype.methodCreate)),

            function MethodCreateController_methodCreate(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IMethod"},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MethodCreateController();


              const promise = controller.methodCreate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/method-delete',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(MethodDeleteController)),
            ...(fetchMiddlewares<RequestHandler>(MethodDeleteController.prototype.methodDelete)),

            function MethodDeleteController_methodDelete(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MethodDeleteController();


              const promise = controller.methodDelete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/method-update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(MethodUpdateController)),
            ...(fetchMiddlewares<RequestHandler>(MethodUpdateController.prototype.methodUpdate)),

            function MethodUpdateController_methodUpdate(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IMethod"},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MethodUpdateController();


              const promise = controller.methodUpdate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/method',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(MethodController)),
            ...(fetchMiddlewares<RequestHandler>(MethodController.prototype.method)),

            function MethodController_method(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MethodController();


              const promise = controller.method.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/methods',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(MethodsController)),
            ...(fetchMiddlewares<RequestHandler>(MethodsController.prototype.methods)),

            function MethodsController_methods(request: any, response: any, next: any) {
            const args = {
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MethodsController();


              const promise = controller.methods.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/o/list-categories-with-positions',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OController)),
            ...(fetchMiddlewares<RequestHandler>(OController.prototype.listCategoriesWithPositions)),

            function OController_listCategoriesWithPositions(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OController();


              const promise = controller.listCategoriesWithPositions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/o/add-or-update-order',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OController)),
            ...(fetchMiddlewares<RequestHandler>(OController.prototype.addOrUpdateOrder)),

            function OController_addOrUpdateOrder(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IOrder"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OController();


              const promise = controller.addOrUpdateOrder.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/o/list-orders-for-table',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OController)),
            ...(fetchMiddlewares<RequestHandler>(OController.prototype.listOrdersForTable)),

            function OController_listOrdersForTable(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"tableId":{"dataType":"double","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OController();


              const promise = controller.listOrdersForTable.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/o/order-by-number',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OController)),
            ...(fetchMiddlewares<RequestHandler>(OController.prototype.orderByNumber)),

            function OController_orderByNumber(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"orderNumber":{"dataType":"double","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OController();


              const promise = controller.orderByNumber.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/o/remove-order-by-number',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OController)),
            ...(fetchMiddlewares<RequestHandler>(OController.prototype.removeOrderByNumber)),

            function OController_removeOrderByNumber(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"orderNumber":{"dataType":"double","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OController();


              const promise = controller.removeOrderByNumber.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/o/finish-order-by-number',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OController)),
            ...(fetchMiddlewares<RequestHandler>(OController.prototype.finishOrderByNumber)),

            function OController_finishOrderByNumber(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"finishTime":{"dataType":"double","required":true},"paymentMethod":{"dataType":"string","required":true},"orderNumber":{"dataType":"double","required":true}}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OController();


              const promise = controller.finishOrderByNumber.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/o/tables-with-orders',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OController)),
            ...(fetchMiddlewares<RequestHandler>(OController.prototype.tablesWithOrders)),

            function OController_tablesWithOrders(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OController();


              const promise = controller.tablesWithOrders.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/order-return',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(OrderReturnController)),
            ...(fetchMiddlewares<RequestHandler>(OrderReturnController.prototype.orderReturn)),

            function OrderReturnController_orderReturn(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrderReturnController();


              const promise = controller.orderReturn.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/period-stats',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(PeriodStatsController)),
            ...(fetchMiddlewares<RequestHandler>(PeriodStatsController.prototype.periodStats)),

            function PeriodStatsController_periodStats(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"dayEnd":{"dataType":"string","required":true},"dayStart":{"dataType":"string","required":true}}},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PeriodStatsController();


              const promise = controller.periodStats.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/public-company',
            ...(fetchMiddlewares<RequestHandler>(PublicCompanyController)),
            ...(fetchMiddlewares<RequestHandler>(PublicCompanyController.prototype.publicCompany)),

            function PublicCompanyController_publicCompany(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"login":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PublicCompanyController();


              const promise = controller.publicCompany.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/registration',
            ...(fetchMiddlewares<RequestHandler>(RegistrationController)),
            ...(fetchMiddlewares<RequestHandler>(RegistrationController.prototype.registration)),

            function RegistrationController_registration(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"currency":{"dataType":"string","required":true},"lang":{"dataType":"string","required":true},"password":{"dataType":"string","required":true},"tin":{"dataType":"string","required":true},"login":{"dataType":"string","required":true},"title":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new RegistrationController();


              const promise = controller.registration.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/table-create',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(TableCreateController)),
            ...(fetchMiddlewares<RequestHandler>(TableCreateController.prototype.tableCreate)),

            function TableCreateController_tableCreate(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ITable"},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TableCreateController();


              const promise = controller.tableCreate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/table-delete',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(TableDeleteController)),
            ...(fetchMiddlewares<RequestHandler>(TableDeleteController.prototype.tableDelete)),

            function TableDeleteController_tableDelete(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TableDeleteController();


              const promise = controller.tableDelete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/table-update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(TableUpdateController)),
            ...(fetchMiddlewares<RequestHandler>(TableUpdateController.prototype.tableUpdate)),

            function TableUpdateController_tableUpdate(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ITable"},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TableUpdateController();


              const promise = controller.tableUpdate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tables',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(TablesController)),
            ...(fetchMiddlewares<RequestHandler>(TablesController.prototype.tables)),

            function TablesController_tables(request: any, response: any, next: any) {
            const args = {
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TablesController();


              const promise = controller.tables.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user-create',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserCreateController)),
            ...(fetchMiddlewares<RequestHandler>(UserCreateController.prototype.userCreate)),

            function UserCreateController_userCreate(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IUser"},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserCreateController();


              const promise = controller.userCreate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user-delete',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserDeleteController)),
            ...(fetchMiddlewares<RequestHandler>(UserDeleteController.prototype.userDelete)),

            function UserDeleteController_userDelete(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserDeleteController();


              const promise = controller.userDelete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user-update',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserUpdateController)),
            ...(fetchMiddlewares<RequestHandler>(UserUpdateController.prototype.userUpdate)),

            function UserUpdateController_userUpdate(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"IUser"},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserUpdateController();


              const promise = controller.userUpdate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.user)),

            function UserController_user(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.user.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/users',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.users)),

            function UsersController_users(request: any, response: any, next: any) {
            const args = {
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UsersController();


              const promise = controller.users.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/whoami',
            authenticateMiddleware([{"Bearer":["AuthService"]}]),
            ...(fetchMiddlewares<RequestHandler>(WhoamiController)),
            ...(fetchMiddlewares<RequestHandler>(WhoamiController.prototype.whoami)),

            function WhoamiController_whoami(request: any, response: any, next: any) {
            const args = {
                    auth: {"in":"request","name":"auth","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WhoamiController();


              const promise = controller.whoami.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny(secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
