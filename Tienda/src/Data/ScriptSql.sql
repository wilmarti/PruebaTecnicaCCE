USE [Northwind]
GO
/****** Object:  Table [dbo].[ProductosCarro]    Script Date: 30/08/2021 5:25:06 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductosCarro](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdProducto] [int] NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[Cantidad] [int] NULL,
	[Fecha] [datetime] NULL,
 CONSTRAINT [PK_ProductosCarro] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 30/08/2021 5:25:06 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[NombreUsuario] [varchar](200) NULL,
	[Email] [varchar](200) NULL,
	[Contraseña] [varchar](200) NULL,
	[FechaCreacion] [datetime] NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ventas]    Script Date: 30/08/2021 5:25:06 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ventas](
	[IdVenta] [int] IDENTITY(1,1) NOT NULL,
	[NombreComprador] [varchar](100) NULL,
	[EmailComprador] [varchar](100) NULL,
	[PasswordComprador] [varchar](100) NULL,
	[IdProducto] [int] NULL,
	[Cantidad] [int] NULL,
	[ValorUnidad] [money] NULL,
	[ValorTotal] [money] NULL,
 CONSTRAINT [PK_Ventas] PRIMARY KEY CLUSTERED 
(
	[IdVenta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ProductosCarro] ON 

INSERT [dbo].[ProductosCarro] ([Id], [IdProducto], [IdUsuario], [Cantidad], [Fecha]) VALUES (3, 7, 1, 5, CAST(N'2021-08-27T11:40:54.733' AS DateTime))
INSERT [dbo].[ProductosCarro] ([Id], [IdProducto], [IdUsuario], [Cantidad], [Fecha]) VALUES (30, 7, 1, 5, CAST(N'2021-08-28T19:35:31.457' AS DateTime))
INSERT [dbo].[ProductosCarro] ([Id], [IdProducto], [IdUsuario], [Cantidad], [Fecha]) VALUES (40, 7, 1, 1, CAST(N'2021-08-29T20:37:01.283' AS DateTime))
INSERT [dbo].[ProductosCarro] ([Id], [IdProducto], [IdUsuario], [Cantidad], [Fecha]) VALUES (42, 7, 1, 2, CAST(N'2021-08-30T13:10:42.893' AS DateTime))
INSERT [dbo].[ProductosCarro] ([Id], [IdProducto], [IdUsuario], [Cantidad], [Fecha]) VALUES (43, 3, 1, 3, CAST(N'2021-08-30T13:10:58.713' AS DateTime))
INSERT [dbo].[ProductosCarro] ([Id], [IdProducto], [IdUsuario], [Cantidad], [Fecha]) VALUES (44, 1, 1, 9, CAST(N'2021-08-30T15:32:25.797' AS DateTime))
INSERT [dbo].[ProductosCarro] ([Id], [IdProducto], [IdUsuario], [Cantidad], [Fecha]) VALUES (45, 4, 1, 3, CAST(N'2021-08-30T15:33:03.430' AS DateTime))
SET IDENTITY_INSERT [dbo].[ProductosCarro] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([IdUsuario], [NombreUsuario], [Email], [Contraseña], [FechaCreacion]) VALUES (1, N'wilson', N'wilsonmartine@gmail.com', N'12345', CAST(N'2021-08-26T23:49:32.723' AS DateTime))
INSERT [dbo].[Usuarios] ([IdUsuario], [NombreUsuario], [Email], [Contraseña], [FechaCreacion]) VALUES (2, N'undefined', N'undefined', N'', CAST(N'2021-08-26T23:53:21.710' AS DateTime))
INSERT [dbo].[Usuarios] ([IdUsuario], [NombreUsuario], [Email], [Contraseña], [FechaCreacion]) VALUES (3, N'undefined', N'undefined', N'12345', CAST(N'2021-08-27T00:08:28.680' AS DateTime))
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
SET IDENTITY_INSERT [dbo].[Ventas] ON 

INSERT [dbo].[Ventas] ([IdVenta], [NombreComprador], [EmailComprador], [PasswordComprador], [IdProducto], [Cantidad], [ValorUnidad], [ValorTotal]) VALUES (1, N'undefined', N'dddd', N'eeeee', 3, 3, 10.0000, 30.0000)
INSERT [dbo].[Ventas] ([IdVenta], [NombreComprador], [EmailComprador], [PasswordComprador], [IdProducto], [Cantidad], [ValorUnidad], [ValorTotal]) VALUES (2, N'undefined', N'wilsonmartine@gmail.com', N'123456', 3, 3, 10.0000, 30.0000)
INSERT [dbo].[Ventas] ([IdVenta], [NombreComprador], [EmailComprador], [PasswordComprador], [IdProducto], [Cantidad], [ValorUnidad], [ValorTotal]) VALUES (3, N'Wilso Martinez', N'wilmarti@hotmail.com', N'123456', 3, 3, 10.0000, 30.0000)
INSERT [dbo].[Ventas] ([IdVenta], [NombreComprador], [EmailComprador], [PasswordComprador], [IdProducto], [Cantidad], [ValorUnidad], [ValorTotal]) VALUES (4, N'qwqwq', N'ererer', N'dffdffd', 7, 13, 30.0000, 390.0000)
INSERT [dbo].[Ventas] ([IdVenta], [NombreComprador], [EmailComprador], [PasswordComprador], [IdProducto], [Cantidad], [ValorUnidad], [ValorTotal]) VALUES (5, N'ssss', N'ddddd', N'fffff', 4, 43, 22.0000, 946.0000)
INSERT [dbo].[Ventas] ([IdVenta], [NombreComprador], [EmailComprador], [PasswordComprador], [IdProducto], [Cantidad], [ValorUnidad], [ValorTotal]) VALUES (6, N'Yenny Pinzon', N'Pinzon.aaa@hotmail.com', N'654321', 1, 9, 18.0000, 162.0000)
SET IDENTITY_INSERT [dbo].[Ventas] OFF
GO
ALTER TABLE [dbo].[ProductosCarro] ADD  CONSTRAINT [DF_ProductosCarro_Fecha]  DEFAULT (getdate()) FOR [Fecha]
GO
ALTER TABLE [dbo].[Usuarios] ADD  CONSTRAINT [DF_Usuarios_FechaCreacion]  DEFAULT (getdate()) FOR [FechaCreacion]
GO
