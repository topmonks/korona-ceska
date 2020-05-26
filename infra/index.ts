import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { WebSite } from "./website";

const korona = WebSite.create('korona-ceska.cz', { isPwa: true });

// FIXME: Diagnostics:
// aws:acm:Certificate (certificate):
//   error: Duplicate resource URN 'urn:pulumi:korona-ceska-prod::korona-ceska::aws:acm/certificate:Certificate::certificate'; try giving it a unique name

WebSite.createRedirect('koronaceska.cz', { target: 'korona-ceska.cz' });
WebSite.createRedirect('www.koronaceska.cz', { target: 'korona-ceska.cz' });
WebSite.createRedirect('www.korona-ceska.cz', { target: 'korona-ceska.cz' });

export const websiteUrl = korona.url;
export const cloudFrontId = korona.cloudFrontId;
export const s3BucketUri = korona.s3BucketUri;
export const s3WebsiteUrl = korona.s3WebsiteUrl;
