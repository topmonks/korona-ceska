import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { WebSite } from "./website";

const korona = WebSite.create('korona-ceska.cz', {});

export const websiteUrl = korona.url;
export const cloudFrontId = korona.cloudFrontId;
export const s3BucketUri = korona.s3BucketUri;
export const s3WebsiteUrl = korona.s3WebsiteUrl;