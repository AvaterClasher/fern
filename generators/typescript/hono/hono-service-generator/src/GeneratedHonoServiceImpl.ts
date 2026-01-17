import {
    HttpEndpoint,
    HttpMethod,
    HttpRequestBody,
    HttpResponseBody,
    HttpService,
    Package,
    PathParameter
} from "@fern-fern/ir-sdk/api";
import {
    convertHttpPathToExpressRoute,
    getPropertyKey,
    getTextOfTsNode,
    maybeAddDocsNode,
    PackageId
} from "@fern-typescript/commons";
import { HonoContext, GeneratedHonoService } from "@fern-typescript/contexts";
import { ClassDeclaration, InterfaceDeclaration, Scope, ts } from "ts-morph";

export declare namespace GeneratedHonoServiceImpl {
    export interface Init {
        packageId: PackageId;
        package: Package;
        service: HttpService;
        serviceClassName: string;
        doNotHandleUnrecognizedErrors: boolean;
        includeSerdeLayer: boolean;
        skipRequestValidation: boolean;
        skipResponseValidation: boolean;
        requestValidationStatusCode: number;
    }
}

export class GeneratedHonoServiceImpl implements GeneratedHonoService {
    private static readonly APP_PROPERTY_NAME = "app";
    private static readonly METHODS_PROPERTY_NAME = "methods";
    private static readonly ADD_MIDDLEWARE_METHOD_NAME = "addMiddleware";
    private static readonly TO_HONO_METHOD_NAME = "toHono";
    private static readonly CATCH_BLOCK_ERROR_VARIABLE_NAME = "error";
    private static readonly RESPONSE_BODY_PARAMETER_NAME = "responseBody";

    private doNotHandleUnrecognizedErrors: boolean;
    private serviceClassName: string;
    private service: HttpService;
    private packageId: PackageId;
    private package_: Package;
    private includeSerdeLayer: boolean;
    private skipRequestValidation: boolean;
    private skipResponseValidation: boolean;
    private requestValidationStatusCode: number;

    constructor({
        packageId,
        package: package_,
        serviceClassName,
        service,
        doNotHandleUnrecognizedErrors,
        includeSerdeLayer,
        skipRequestValidation,
        skipResponseValidation,
        requestValidationStatusCode
    }: GeneratedHonoServiceImpl.Init) {
        this.serviceClassName = serviceClassName;
        this.service = service;
        this.doNotHandleUnrecognizedErrors = doNotHandleUnrecognizedErrors;
        this.packageId = packageId;
        this.package_ = package_;
        this.includeSerdeLayer = includeSerdeLayer;
        this.skipRequestValidation = skipRequestValidation;
        this.skipResponseValidation = skipResponseValidation;
        this.requestValidationStatusCode = requestValidationStatusCode;
    }

    public writeToFile(context: HonoContext): void {
        const methodsInterface = context.sourceFile.addInterface({
            name: this.getMethodsInterfaceName(),
            isExported: true
        });

        for (const endpoint of this.service.endpoints) {
            this.addEndpointMethodToInterface({ endpoint, methodsInterface, context });
        }

        const serviceClass = context.sourceFile.addClass({
            name: this.serviceClassName,
            isExported: true
        });
        maybeAddDocsNode(serviceClass, this.package_.docs);

        serviceClass.addProperty({
            scope: Scope.Private,
            name: GeneratedHonoServiceImpl.APP_PROPERTY_NAME
        });

        this.addConstructor(serviceClass, context);

        this.addAddMiddlewareMethod({ serviceClass, context });

        serviceClass.addMethod({
            scope: Scope.Public,
            name: GeneratedHonoServiceImpl.TO_HONO_METHOD_NAME,
            returnType: getTextOfTsNode(context.externalDependencies.hono.Hono._getReferenceToType()),
            statements: [
                ...this.service.endpoints.map((endpoint) => this.addRouteToApp(endpoint, context)),
                ts.factory.createReturnStatement(
                    ts.factory.createPropertyAccessExpression(
                        ts.factory.createThis(),
                        GeneratedHonoServiceImpl.APP_PROPERTY_NAME
                    )
                )
            ].map(getTextOfTsNode)
        });
    }

    private addConstructor(serviceClass: ClassDeclaration, context: HonoContext) {
        const middlewareParameterName = "middleware";
        serviceClass.addConstructor({
            parameters: [
                {
                    name: GeneratedHonoServiceImpl.METHODS_PROPERTY_NAME,
                    isReadonly: true,
                    scope: Scope.Private,
                    type: this.getMethodsInterfaceName()
                },
                {
                    name: middlewareParameterName,
                    type: getTextOfTsNode(
                        ts.factory.createArrayTypeNode(context.externalDependencies.hono.MiddlewareHandler())
                    ),
                    initializer: getTextOfTsNode(ts.factory.createArrayLiteralExpression([]))
                }
            ],
            statements: [
                ts.factory.createExpressionStatement(
                    ts.factory.createBinaryExpression(
                        ts.factory.createPropertyAccessExpression(
                            ts.factory.createThis(),
                            GeneratedHonoServiceImpl.APP_PROPERTY_NAME
                        ),
                        ts.factory.createToken(ts.SyntaxKind.EqualsToken),
                        context.externalDependencies.hono.Hono._instantiate()
                    )
                ),
                // Apply middleware to all routes
                ts.factory.createExpressionStatement(
                    ts.factory.createCallExpression(
                        ts.factory.createPropertyAccessExpression(
                            ts.factory.createIdentifier(middlewareParameterName),
                            ts.factory.createIdentifier("forEach")
                        ),
                        undefined,
                        [
                            ts.factory.createArrowFunction(
                                undefined,
                                undefined,
                                [ts.factory.createParameterDeclaration(undefined, undefined, "m")],
                                undefined,
                                ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                                ts.factory.createCallExpression(
                                    ts.factory.createPropertyAccessExpression(
                                        ts.factory.createPropertyAccessExpression(
                                            ts.factory.createThis(),
                                            GeneratedHonoServiceImpl.APP_PROPERTY_NAME
                                        ),
                                        ts.factory.createIdentifier("use")
                                    ),
                                    undefined,
                                    [ts.factory.createStringLiteral("*"), ts.factory.createIdentifier("m")]
                                )
                            )
                        ]
                    )
                )
            ].map(getTextOfTsNode)
        });
    }

    public toHono(referenceToService: ts.Expression): ts.Expression {
        return ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(
                referenceToService,
                GeneratedHonoServiceImpl.TO_HONO_METHOD_NAME
            ),
            undefined,
            undefined
        );
    }

    private addEndpointMethodToInterface({
        endpoint,
        methodsInterface,
        context
    }: {
        endpoint: HttpEndpoint;
        methodsInterface: InterfaceDeclaration;
        context: HonoContext;
    }) {
        const REQUEST_PARAMETER_NAME = "req";
        const RESPONSE_PARAMETER_NAME = "res";

        const COOKIE_PARAMETER_NAME = "cookie";
        const COOKIE_VALUE_PARAMETER_NAME = "value";
        const COOKIE_OPTIONS_PARAMETER_NAME = "options";

        const allPathParameters = [...this.service.pathParameters, ...endpoint.pathParameters];

        methodsInterface.addMethod({
            name: this.getEndpointMethodName(endpoint),
            parameters: [
                {
                    name: REQUEST_PARAMETER_NAME,
                    type: getTextOfTsNode(
                        ts.factory.createTypeLiteralNode([
                            ...(allPathParameters.length > 0
                                ? [
                                      ts.factory.createPropertySignature(
                                          undefined,
                                          ts.factory.createIdentifier("params"),
                                          undefined,
                                          ts.factory.createTypeLiteralNode(
                                              allPathParameters.map((pathParameter) => {
                                                  const type = this.includeSerdeLayer
                                                      ? context.typeSchema.getReferenceToRawType(pathParameter.valueType)
                                                      : context.type.getReferenceToType(pathParameter.valueType);
                                                  return ts.factory.createPropertySignature(
                                                      undefined,
                                                      getPropertyKey(this.getPathParameterName(pathParameter)),
                                                      type.isOptional
                                                          ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
                                                          : undefined,
                                                      type.typeNodeWithoutUndefined
                                                  );
                                              })
                                          )
                                      )
                                  ]
                                : []),
                            ...(endpoint.queryParameters.length > 0
                                ? [
                                      ts.factory.createPropertySignature(
                                          undefined,
                                          ts.factory.createIdentifier("query"),
                                          undefined,
                                          ts.factory.createTypeLiteralNode(
                                              endpoint.queryParameters.map((queryParameter) => {
                                                  const type = context.type.getReferenceToType(queryParameter.valueType);
                                                  return ts.factory.createPropertySignature(
                                                      undefined,
                                                      getPropertyKey(queryParameter.name.wireValue),
                                                      type.isOptional
                                                          ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
                                                          : undefined,
                                                      type.typeNodeWithoutUndefined
                                                  );
                                              })
                                          )
                                      )
                                  ]
                                : []),
                            ...(endpoint.requestBody != null
                                ? [
                                      ts.factory.createPropertySignature(
                                          undefined,
                                          ts.factory.createIdentifier("body"),
                                          undefined,
                                          this.getReferenceToParsedRequestBody({
                                              endpoint,
                                              requestBody: endpoint.requestBody,
                                              context
                                          })
                                      )
                                  ]
                                : [])
                        ])
                    )
                },
                {
                    name: RESPONSE_PARAMETER_NAME,
                    type: getTextOfTsNode(
                        ts.factory.createTypeLiteralNode([
                            ts.factory.createPropertySignature(
                                undefined,
                                ts.factory.createIdentifier("send"),
                                undefined,
                                ts.factory.createFunctionTypeNode(
                                    undefined,
                                    endpoint.response?.body != null
                                        ? [
                                              ts.factory.createParameterDeclaration(
                                                  undefined,
                                                  undefined,
                                                  GeneratedHonoServiceImpl.RESPONSE_BODY_PARAMETER_NAME,
                                                  undefined,
                                                  this.getResponseBodyType(endpoint.response.body, context)
                                              )
                                          ]
                                        : [],
                                    ts.factory.createTypeReferenceNode("Promise", [
                                        ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
                                    ])
                                )
                            ),
                            ts.factory.createPropertySignature(
                                undefined,
                                ts.factory.createIdentifier("cookie"),
                                undefined,
                                ts.factory.createFunctionTypeNode(
                                    undefined,
                                    [
                                        ts.factory.createParameterDeclaration(
                                            undefined,
                                            undefined,
                                            COOKIE_PARAMETER_NAME,
                                            undefined,
                                            ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
                                        ),
                                        ts.factory.createParameterDeclaration(
                                            undefined,
                                            undefined,
                                            COOKIE_VALUE_PARAMETER_NAME,
                                            undefined,
                                            ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
                                        ),
                                        ts.factory.createParameterDeclaration(
                                            undefined,
                                            undefined,
                                            COOKIE_OPTIONS_PARAMETER_NAME,
                                            ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                                            context.externalDependencies.hono.CookieOptions._getReferenceToType()
                                        )
                                    ],
                                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
                                )
                            ),
                            ts.factory.createPropertySignature(
                                undefined,
                                ts.factory.createIdentifier("locals"),
                                undefined,
                                ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                            )
                        ])
                    )
                }
            ],
            returnType: getTextOfTsNode(
                ts.factory.createUnionTypeNode([
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
                    ts.factory.createTypeReferenceNode("Promise", [
                        ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
                    ])
                ])
            )
        });
    }

    private addAddMiddlewareMethod({
        serviceClass,
        context
    }: {
        serviceClass: ClassDeclaration;
        context: HonoContext;
    }) {
        const HANDLER_PARAMETER_NAME = "handler";

        serviceClass.addMethod({
            scope: Scope.Public,
            name: GeneratedHonoServiceImpl.ADD_MIDDLEWARE_METHOD_NAME,
            parameters: [
                {
                    name: HANDLER_PARAMETER_NAME,
                    type: getTextOfTsNode(context.externalDependencies.hono.MiddlewareHandler())
                }
            ],
            returnType: getTextOfTsNode(ts.factory.createThisTypeNode()),
            statements: [
                ts.factory.createExpressionStatement(
                    ts.factory.createCallExpression(
                        ts.factory.createPropertyAccessExpression(
                            this.getReferenceToApp(),
                            ts.factory.createIdentifier("use")
                        ),
                        undefined,
                        [ts.factory.createStringLiteral("*"), ts.factory.createIdentifier(HANDLER_PARAMETER_NAME)]
                    )
                ),
                ts.factory.createReturnStatement(ts.factory.createThis())
            ].map(getTextOfTsNode)
        });
    }

    private getEndpointMethodName(endpoint: HttpEndpoint): string {
        return endpoint.name.camelCase.unsafeName;
    }

    private addRouteToApp(endpoint: HttpEndpoint, context: HonoContext): ts.Statement {
        return context.externalDependencies.hono.Hono._addRoute({
            referenceToApp: this.getReferenceToApp(),
            method: HttpMethod._visit<"get" | "post" | "put" | "patch" | "delete" | "head">(endpoint.method, {
                get: () => "get",
                post: () => "post",
                put: () => "put",
                patch: () => "patch",
                delete: () => "delete",
                head: () => "head",
                _other: () => {
                    throw new Error("Unknown HTTP method");
                }
            }),
            path: convertHttpPathToExpressRoute(endpoint.path),
            buildHandler: ({ honoContext }) => {
                return ts.factory.createBlock(
                    [
                        ...(endpoint.requestBody != null
                            ? this.getIfElseMaybeWithValidation({
                                  honoContext,
                                  endpoint,
                                  context,
                                  requestBody: endpoint.requestBody
                              })
                            : [
                                  this.getTryCatch({
                                      honoContext,
                                      endpoint,
                                      context
                                  })
                              ])
                    ],
                    true
                );
            }
        });
    }

    private getIfElseMaybeWithValidation({
        honoContext,
        endpoint,
        requestBody,
        context
    }: {
        honoContext: ts.Expression;
        endpoint: HttpEndpoint;
        requestBody: HttpRequestBody;
        context: HonoContext;
    }): ts.Statement[] {
        const DESERIALIZED_REQUEST_VARIABLE_NAME = "request";

        const referenceToBody = ts.factory.createAwaitExpression(
            ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(
                    ts.factory.createPropertyAccessExpression(honoContext, "req"),
                    ts.factory.createIdentifier("json")
                ),
                undefined,
                undefined
            )
        );

        // no validation required for `unknown` requests or when there's no serde layer
        const isRequestBodyUnknown =
            requestBody.type === "reference" &&
            context.type.resolveTypeReference(requestBody.requestBodyType).type === "unknown";
        if (!this.includeSerdeLayer || isRequestBodyUnknown) {
            return [
                this.getTryCatch({
                    honoContext,
                    endpoint,
                    context
                })
            ];
        }

        return [
            ts.factory.createVariableStatement(
                undefined,
                ts.factory.createVariableDeclarationList(
                    [
                        ts.factory.createVariableDeclaration(
                            DESERIALIZED_REQUEST_VARIABLE_NAME,
                            undefined,
                            undefined,
                            this.deserializeRequest({
                                endpoint,
                                requestBodyType: requestBody,
                                referenceToBody,
                                context
                            })
                        )
                    ],
                    ts.NodeFlags.Const
                )
            ),

            ...context.coreUtilities.zurg.Schema._visitMaybeValid(
                ts.factory.createIdentifier(DESERIALIZED_REQUEST_VARIABLE_NAME),
                {
                    valid: (validRequestBody) => [
                        this.getTryCatch({
                            honoContext,
                            endpoint,
                            context,
                            validatedBody: validRequestBody
                        })
                    ],
                    invalid: (requestErrors) => {
                        const ERROR_VARIABLE_NAME = "error";
                        return [
                            ts.factory.createReturnStatement(
                                ts.factory.createCallExpression(
                                    ts.factory.createPropertyAccessExpression(honoContext, "json"),
                                    undefined,
                                    [
                                        ts.factory.createObjectLiteralExpression([
                                            ts.factory.createPropertyAssignment(
                                                "errors",
                                                ts.factory.createCallExpression(
                                                    ts.factory.createPropertyAccessExpression(
                                                        requestErrors,
                                                        ts.factory.createIdentifier("map")
                                                    ),
                                                    undefined,
                                                    [
                                                        ts.factory.createArrowFunction(
                                                            undefined,
                                                            undefined,
                                                            [
                                                                ts.factory.createParameterDeclaration(
                                                                    undefined,
                                                                    undefined,
                                                                    ERROR_VARIABLE_NAME
                                                                )
                                                            ],
                                                            undefined,
                                                            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                                                            ts.factory.createBinaryExpression(
                                                                ts.factory.createBinaryExpression(
                                                                    ts.factory.createCallExpression(
                                                                        ts.factory.createPropertyAccessExpression(
                                                                            ts.factory.createArrayLiteralExpression(
                                                                                [
                                                                                    ts.factory.createStringLiteral(
                                                                                        "request"
                                                                                    ),
                                                                                    ts.factory.createSpreadElement(
                                                                                        ts.factory.createPropertyAccessExpression(
                                                                                            ts.factory.createIdentifier(
                                                                                                ERROR_VARIABLE_NAME
                                                                                            ),
                                                                                            context.coreUtilities.zurg
                                                                                                .ValidationError.path
                                                                                        )
                                                                                    )
                                                                                ],
                                                                                false
                                                                            ),
                                                                            ts.factory.createIdentifier("join")
                                                                        ),
                                                                        undefined,
                                                                        [ts.factory.createStringLiteral(" -> ")]
                                                                    ),
                                                                    ts.factory.createToken(ts.SyntaxKind.PlusToken),
                                                                    ts.factory.createStringLiteral(": ")
                                                                ),
                                                                ts.factory.createToken(ts.SyntaxKind.PlusToken),
                                                                ts.factory.createPropertyAccessExpression(
                                                                    ts.factory.createIdentifier(ERROR_VARIABLE_NAME),
                                                                    context.coreUtilities.zurg.ValidationError.message
                                                                )
                                                            )
                                                        )
                                                    ]
                                                )
                                            )
                                        ]),
                                        ts.factory.createNumericLiteral(this.requestValidationStatusCode)
                                    ]
                                )
                            )
                        ];
                    }
                }
            )
        ];
    }

    private getTryCatch({
        honoContext,
        endpoint,
        context,
        validatedBody
    }: {
        honoContext: ts.Expression;
        endpoint: HttpEndpoint;
        context: HonoContext;
        validatedBody?: ts.Expression;
    }): ts.TryStatement {
        return ts.factory.createTryStatement(
            ts.factory.createBlock(
                this.getStatementsForTryBlock({ honoContext, endpoint, context, validatedBody }),
                true
            ),
            this.getCatchClause({ honoContext, context, endpoint }),
            undefined
        );
    }

    private getStatementsForTryBlock({
        honoContext,
        endpoint,
        context,
        validatedBody
    }: {
        honoContext: ts.Expression;
        endpoint: HttpEndpoint;
        context: HonoContext;
        validatedBody?: ts.Expression;
    }): ts.Statement[] {
        const statements: ts.Statement[] = [];

        const allPathParameters = [...this.service.pathParameters, ...endpoint.pathParameters];

        // Variables to capture response
        const RESPONSE_BODY_VARIABLE = "_responseBody";
        const COOKIES_VARIABLE = "_cookies";

        // Declare response capture variables
        if (endpoint.response?.body != null) {
            statements.push(
                ts.factory.createVariableStatement(
                    undefined,
                    ts.factory.createVariableDeclarationList(
                        [
                            ts.factory.createVariableDeclaration(
                                RESPONSE_BODY_VARIABLE,
                                undefined,
                                undefined,
                                ts.factory.createIdentifier("undefined")
                            )
                        ],
                        ts.NodeFlags.Let
                    )
                )
            );
        }

        statements.push(
            ts.factory.createVariableStatement(
                undefined,
                ts.factory.createVariableDeclarationList(
                    [
                        ts.factory.createVariableDeclaration(
                            COOKIES_VARIABLE,
                            undefined,
                            undefined,
                            ts.factory.createArrayLiteralExpression([])
                        )
                    ],
                    ts.NodeFlags.Const
                )
            )
        );

        // Build request object
        const requestProperties: ts.ObjectLiteralElementLike[] = [];

        // Add params
        if (allPathParameters.length > 0) {
            requestProperties.push(
                ts.factory.createPropertyAssignment(
                    "params",
                    ts.factory.createCallExpression(
                        ts.factory.createPropertyAccessExpression(
                            ts.factory.createPropertyAccessExpression(honoContext, "req"),
                            ts.factory.createIdentifier("param")
                        ),
                        undefined,
                        undefined
                    )
                )
            );
        }

        // Add query
        if (endpoint.queryParameters.length > 0) {
            requestProperties.push(
                ts.factory.createPropertyAssignment(
                    "query",
                    ts.factory.createCallExpression(
                        ts.factory.createPropertyAccessExpression(
                            ts.factory.createPropertyAccessExpression(honoContext, "req"),
                            ts.factory.createIdentifier("query")
                        ),
                        undefined,
                        undefined
                    )
                )
            );
        }

        // Add body
        if (endpoint.requestBody != null) {
            requestProperties.push(
                ts.factory.createPropertyAssignment(
                    "body",
                    validatedBody ??
                        ts.factory.createAwaitExpression(
                            ts.factory.createCallExpression(
                                ts.factory.createPropertyAccessExpression(
                                    ts.factory.createPropertyAccessExpression(honoContext, "req"),
                                    ts.factory.createIdentifier("json")
                                ),
                                undefined,
                                undefined
                            )
                        )
                )
            );
        }

        const requestObject = ts.factory.createObjectLiteralExpression(requestProperties, true);

        // Call impl
        statements.push(
            ts.factory.createExpressionStatement(
                ts.factory.createAwaitExpression(
                    ts.factory.createCallExpression(
                        ts.factory.createPropertyAccessExpression(
                            ts.factory.createPropertyAccessExpression(
                                ts.factory.createThis(),
                                GeneratedHonoServiceImpl.METHODS_PROPERTY_NAME
                            ),
                            this.getEndpointMethodName(endpoint)
                        ),
                        undefined,
                        [
                            requestObject,
                            ts.factory.createObjectLiteralExpression(
                                [
                                    ts.factory.createPropertyAssignment(
                                        "send",
                                        ts.factory.createArrowFunction(
                                            [ts.factory.createToken(ts.SyntaxKind.AsyncKeyword)],
                                            undefined,
                                            endpoint.response?.body != null
                                                ? [
                                                      ts.factory.createParameterDeclaration(
                                                          undefined,
                                                          undefined,
                                                          GeneratedHonoServiceImpl.RESPONSE_BODY_PARAMETER_NAME
                                                      )
                                                  ]
                                                : [],
                                            undefined,
                                            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                                            ts.factory.createBlock(
                                                endpoint.response?.body != null
                                                    ? [
                                                          ts.factory.createExpressionStatement(
                                                              ts.factory.createBinaryExpression(
                                                                  ts.factory.createIdentifier(RESPONSE_BODY_VARIABLE),
                                                                  ts.factory.createToken(ts.SyntaxKind.EqualsToken),
                                                                  ts.factory.createIdentifier(
                                                                      GeneratedHonoServiceImpl.RESPONSE_BODY_PARAMETER_NAME
                                                                  )
                                                              )
                                                          )
                                                      ]
                                                    : [],
                                                true
                                            )
                                        )
                                    ),
                                    ts.factory.createPropertyAssignment(
                                        "cookie",
                                        ts.factory.createArrowFunction(
                                            undefined,
                                            undefined,
                                            [
                                                ts.factory.createParameterDeclaration(undefined, undefined, "name"),
                                                ts.factory.createParameterDeclaration(undefined, undefined, "value"),
                                                ts.factory.createParameterDeclaration(undefined, undefined, "options")
                                            ],
                                            undefined,
                                            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                                            ts.factory.createBlock(
                                                [
                                                    ts.factory.createExpressionStatement(
                                                        ts.factory.createCallExpression(
                                                            ts.factory.createPropertyAccessExpression(
                                                                ts.factory.createIdentifier(COOKIES_VARIABLE),
                                                                ts.factory.createIdentifier("push")
                                                            ),
                                                            undefined,
                                                            [
                                                                ts.factory.createObjectLiteralExpression([
                                                                    ts.factory.createShorthandPropertyAssignment("name"),
                                                                    ts.factory.createShorthandPropertyAssignment("value"),
                                                                    ts.factory.createShorthandPropertyAssignment(
                                                                        "options"
                                                                    )
                                                                ])
                                                            ]
                                                        )
                                                    )
                                                ],
                                                true
                                            )
                                        )
                                    ),
                                    ts.factory.createPropertyAssignment(
                                        "locals",
                                        ts.factory.createObjectLiteralExpression([])
                                    )
                                ],
                                true
                            )
                        ]
                    )
                )
            )
        );

        // Set cookies if any were added
        statements.push(
            ts.factory.createForOfStatement(
                undefined,
                ts.factory.createVariableDeclarationList(
                    [ts.factory.createVariableDeclaration("cookie")],
                    ts.NodeFlags.Const
                ),
                ts.factory.createIdentifier(COOKIES_VARIABLE),
                ts.factory.createBlock(
                    [
                        ts.factory.createExpressionStatement(
                            ts.factory.createCallExpression(
                                ts.factory.createIdentifier("setCookie"),
                                undefined,
                                [
                                    honoContext,
                                    ts.factory.createPropertyAccessExpression(
                                        ts.factory.createIdentifier("cookie"),
                                        "name"
                                    ),
                                    ts.factory.createPropertyAccessExpression(
                                        ts.factory.createIdentifier("cookie"),
                                        "value"
                                    ),
                                    ts.factory.createPropertyAccessExpression(
                                        ts.factory.createIdentifier("cookie"),
                                        "options"
                                    )
                                ]
                            )
                        )
                    ],
                    true
                )
            )
        );

        // Return response
        statements.push(
            ts.factory.createReturnStatement(
                endpoint.response?.body != null
                    ? ts.factory.createCallExpression(
                          ts.factory.createPropertyAccessExpression(honoContext, "json"),
                          undefined,
                          [
                              context.honoEndpointTypeSchemas
                                  .getGeneratedEndpointTypeSchemas(this.packageId, endpoint.name)
                                  .serializeResponse(ts.factory.createIdentifier(RESPONSE_BODY_VARIABLE), context),
                              ts.factory.createNumericLiteral(endpoint.response.statusCode ?? 200)
                          ]
                      )
                    : ts.factory.createCallExpression(
                          ts.factory.createPropertyAccessExpression(honoContext, "text"),
                          undefined,
                          [ts.factory.createStringLiteral(""), ts.factory.createNumericLiteral(204)]
                      )
            )
        );

        return statements;
    }

    private getCatchClause({
        honoContext,
        context,
        endpoint
    }: {
        honoContext: ts.Expression;
        context: HonoContext;
        endpoint: HttpEndpoint;
    }): ts.CatchClause {
        const ERROR_NAME = "error";

        return ts.factory.createCatchClause(
            ts.factory.createVariableDeclaration(ts.factory.createIdentifier(ERROR_NAME)),
            ts.factory.createBlock(
                [
                    ts.factory.createIfStatement(
                        ts.factory.createBinaryExpression(
                            ts.factory.createIdentifier(ERROR_NAME),
                            ts.factory.createToken(ts.SyntaxKind.InstanceOfKeyword),
                            context.genericAPIHonoError.getReferenceToGenericAPIHonoError().getExpression()
                        ),
                        ts.factory.createBlock(
                            [
                                this.generateWarnForUnexpectedError(endpoint, context),
                                ts.factory.createReturnStatement(
                                    context.genericAPIHonoError.getGeneratedGenericAPIHonoError().toResponse({
                                        error: ts.factory.createIdentifier(ERROR_NAME),
                                        honoContext
                                    })
                                )
                            ],
                            true
                        ),
                        this.doNotHandleUnrecognizedErrors
                            ? undefined
                            : ts.factory.createBlock(
                                  [
                                      ts.factory.createReturnStatement(
                                          ts.factory.createCallExpression(
                                              ts.factory.createPropertyAccessExpression(
                                                  honoContext,
                                                  ts.factory.createIdentifier("json")
                                              ),
                                              undefined,
                                              [
                                                  ts.factory.createStringLiteral("Internal Server Error"),
                                                  ts.factory.createNumericLiteral(500)
                                              ]
                                          )
                                      )
                                  ],
                                  true
                              )
                    )
                ],
                true
            )
        );
    }

    private generateWarnForUnexpectedError(endpoint: HttpEndpoint, context: HonoContext): ts.Statement {
        const warnStatement = ts.factory.createExpressionStatement(
            ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(
                    ts.factory.createIdentifier("console"),
                    ts.factory.createIdentifier("warn")
                ),
                undefined,
                [
                    ts.factory.createBinaryExpression(
                        ts.factory.createBinaryExpression(
                            ts.factory.createTemplateExpression(
                                ts.factory.createTemplateHead(
                                    `Endpoint '${endpoint.name.originalName}' unexpectedly threw `
                                ),
                                [
                                    ts.factory.createTemplateSpan(
                                        ts.factory.createPropertyAccessExpression(
                                            ts.factory.createPropertyAccessExpression(
                                                ts.factory.createIdentifier(
                                                    GeneratedHonoServiceImpl.CATCH_BLOCK_ERROR_VARIABLE_NAME
                                                ),
                                                ts.factory.createIdentifier("constructor")
                                            ),
                                            ts.factory.createIdentifier("name")
                                        ),
                                        ts.factory.createTemplateTail(".")
                                    )
                                ]
                            ),
                            ts.factory.createToken(ts.SyntaxKind.PlusToken),
                            ts.factory.createTemplateExpression(
                                ts.factory.createTemplateHead(" If this was intentional, please add "),
                                [
                                    ts.factory.createTemplateSpan(
                                        ts.factory.createPropertyAccessExpression(
                                            ts.factory.createPropertyAccessExpression(
                                                ts.factory.createIdentifier(
                                                    GeneratedHonoServiceImpl.CATCH_BLOCK_ERROR_VARIABLE_NAME
                                                ),
                                                ts.factory.createIdentifier("constructor")
                                            ),
                                            ts.factory.createIdentifier("name")
                                        ),
                                        ts.factory.createTemplateTail(" to")
                                    )
                                ]
                            )
                        ),
                        ts.factory.createToken(ts.SyntaxKind.PlusToken),
                        ts.factory.createStringLiteral(" the endpoint's errors list in your Fern Definition.")
                    )
                ]
            )
        );

        if (endpoint.errors.length === 0) {
            return warnStatement;
        }

        return ts.factory.createSwitchStatement(
            context.genericAPIHonoError.getGeneratedGenericAPIHonoError().getErrorClassName({
                referenceToError: ts.factory.createIdentifier(
                    GeneratedHonoServiceImpl.CATCH_BLOCK_ERROR_VARIABLE_NAME
                )
            }),
            ts.factory.createCaseBlock([
                ...endpoint.errors.map((error, index) =>
                    ts.factory.createCaseClause(
                        ts.factory.createStringLiteral(context.honoError.getErrorClassName(error.error)),
                        index < endpoint.errors.length - 1 ? [] : [ts.factory.createBreakStatement()]
                    )
                ),
                ts.factory.createDefaultClause([warnStatement])
            ])
        );
    }

    private getReferenceToApp(): ts.Expression {
        return ts.factory.createPropertyAccessExpression(
            ts.factory.createThis(),
            GeneratedHonoServiceImpl.APP_PROPERTY_NAME
        );
    }

    private getPathParameterName(pathParameter: PathParameter): string {
        return pathParameter.name.originalName;
    }

    private getReferenceToParsedRequestBody({
        endpoint,
        requestBody,
        context
    }: {
        endpoint: HttpEndpoint;
        requestBody: HttpRequestBody;
        context: HonoContext;
    }): ts.TypeNode {
        return HttpRequestBody._visit(requestBody, {
            inlinedRequestBody: () =>
                context.honoInlinedRequestBody
                    .getReferenceToInlinedRequestBodyType(this.packageId, endpoint.name)
                    .getTypeNode(),
            reference: ({ requestBodyType }) => context.type.getReferenceToType(requestBodyType).typeNode,
            fileUpload: () => {
                throw new Error("File upload is not supported");
            },
            bytes: () => {
                throw new Error("bytes is not supported");
            },
            _other: () => {
                throw new Error("Unknown HttpRequestBody: " + requestBody.type);
            }
        });
    }

    private deserializeRequest({
        endpoint,
        requestBodyType,
        referenceToBody,
        context
    }: {
        endpoint: HttpEndpoint;
        requestBodyType: HttpRequestBody;
        referenceToBody: ts.Expression;
        context: HonoContext;
    }): ts.Expression {
        return HttpRequestBody._visit(requestBodyType, {
            inlinedRequestBody: () => {
                if (this.skipRequestValidation) {
                    return context.honoInlinedRequestBodySchema
                        .getGeneratedInlinedRequestBodySchema(this.packageId, endpoint.name)
                        .deserializeRequest(referenceToBody, context);
                }
                return context.honoInlinedRequestBodySchema
                    .getGeneratedInlinedRequestBodySchema(this.packageId, endpoint.name)
                    .deserializeRequest(referenceToBody, context);
            },
            reference: () => {
                if (this.skipRequestValidation) {
                    return context.honoEndpointTypeSchemas
                        .getGeneratedEndpointTypeSchemas(this.packageId, endpoint.name)
                        .deserializeRequest(referenceToBody, context);
                }
                return context.honoEndpointTypeSchemas
                    .getGeneratedEndpointTypeSchemas(this.packageId, endpoint.name)
                    .deserializeRequest(referenceToBody, context);
            },
            fileUpload: () => {
                throw new Error("File upload is not supported");
            },
            bytes: () => {
                throw new Error("bytes is not supported");
            },
            _other: () => {
                throw new Error("Unknown HttpRequestBody: " + requestBodyType.type);
            }
        });
    }

    private getMethodsInterfaceName(): string {
        return `${this.serviceClassName}Methods`;
    }

    private getResponseBodyType(response: HttpResponseBody, context: HonoContext): ts.TypeNode {
        return HttpResponseBody._visit<ts.TypeNode>(response, {
            json: (jsonResponse) => context.type.getReferenceToType(jsonResponse.responseBodyType).typeNode,
            bytes: () => {
                throw new Error("bytes is not supported");
            },
            streaming: () => {
                throw new Error("Streaming is not supported");
            },
            streamParameter: () => {
                throw new Error("Streaming is not supported");
            },
            fileDownload: () => {
                throw new Error("File download is not supported");
            },
            text: () => {
                throw new Error("Text response is not supported");
            },
            _other: () => {
                throw new Error("Unknown HttpResponseBody: " + response.type);
            }
        });
    }
}
