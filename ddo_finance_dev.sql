PGDMP     6                    {            db_finance_forecast    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    37914    db_finance_forecast    DATABASE     �   CREATE DATABASE db_finance_forecast WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 #   DROP DATABASE db_finance_forecast;
                postgres    false            �            1259    46111    Projects    TABLE     �  CREATE TABLE public."Projects" (
    id integer NOT NULL,
    "fkFinancialYearId" integer,
    "fkClientId" integer,
    name character varying(255),
    "fkCountryId" integer,
    "fkCurrencyId" integer,
    "fkPaymentId" integer,
    "fkBusinessUnitId" integer,
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Projects";
       public         heap    postgres    false            �            1259    46110    Projects_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Projects_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Projects_id_seq";
       public          postgres    false    218                       0    0    Projects_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Projects_id_seq" OWNED BY public."Projects".id;
          public          postgres    false    217            �            1259    37915    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    37921    Users    TABLE     ?  CREATE TABLE public."Users" (
    id integer NOT NULL,
    fullname character varying(255),
    username character varying(255),
    password character varying(255),
    description character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    37920    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    216                       0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    215            o           2604    46114    Projects id    DEFAULT     n   ALTER TABLE ONLY public."Projects" ALTER COLUMN id SET DEFAULT nextval('public."Projects_id_seq"'::regclass);
 <   ALTER TABLE public."Projects" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            n           2604    37924    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                      0    46111    Projects 
   TABLE DATA           �   COPY public."Projects" (id, "fkFinancialYearId", "fkClientId", name, "fkCountryId", "fkCurrencyId", "fkPaymentId", "fkBusinessUnitId", description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   �                 0    37915    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    214   +                 0    37921    Users 
   TABLE DATA           j   COPY public."Users" (id, fullname, username, password, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   z                  0    0    Projects_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Projects_id_seq"', 4, true);
          public          postgres    false    217                       0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 8, true);
          public          postgres    false    215            u           2606    46118    Projects Projects_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Projects"
    ADD CONSTRAINT "Projects_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Projects" DROP CONSTRAINT "Projects_pkey";
       public            postgres    false    218            q           2606    37919     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    214            s           2606    37928    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    216               �   x�u�;
�0��Z:���ev׊�=E )���"n��>��͔?�ǎ�N���?���2�����D�)�o��IN � 7��G����h�E�L�	�k��DdF.	��$C�V(����-2+�W�*��0���&���J��O�A�         ?   x�32026�445�017��M.JM,I�--N-��*�2��Z�X�d��R�K@
b���� w��         �   x�}�?S�0��9�
6�1�!B�*J��B{�q.)�%Q�/)�zup��\���|B4?���p��@\tr�<�x�x�]����ٵ�B�����q<��Cz�_Z�.�J�?���[��բ֢�G@�6�̥w�1���	b��_��\q�&-����G����6A�2/����+���"dY���k5�U��͔�j�F�$�2�6r������O!�1��Wu^��8�SVo     