// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDocument from '../../../app/model/document';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Document: ReturnType<typeof ExportDocument>;
    User: ReturnType<typeof ExportUser>;
  }
}
