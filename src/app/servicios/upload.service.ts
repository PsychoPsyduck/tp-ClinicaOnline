import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage,
              private http: HttpClient) { }

  public subirArchivo(nombreArchivo: string, datos: any,metadata:any) {
    return this.storage.upload(nombreArchivo, datos, {customMetadata:metadata });
  }

  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo).getDownloadURL();
  }
}
