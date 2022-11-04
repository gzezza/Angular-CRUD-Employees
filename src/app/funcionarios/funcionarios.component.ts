import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { funcModel } from './model-funcionarios.model';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  formValue!:FormGroup; 
  funcModelObj:funcModel = new funcModel();
  funcList!:any;
  
  salvarAdd!:boolean;
  salvarEdit!:boolean; 
  
  modalExcObj:any = {
    id: 0,
    nome: '',
    sobrenome: ''
  };

  constructor(private formbuilder:FormBuilder, private service:ServiceService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nome : [''],
      sobrenome : [''],
      email : [''],
      telefone : [''],
      salario : ['']
    })

    this.getFunc();
  }

  btnExcluir(list:any){
    this.modalExcObj.id = list.id; 
    this.modalExcObj.nome = list.nome;
    this.modalExcObj.sobrenome = list.sobrenome;
  }

  btnAdd(){
    this.formValue.reset();
    this.salvarAdd = true;
    this.salvarEdit = false;
  }

  postFunc(){
    this.funcModelObj.nome = this.formValue.value.nome;
    this.funcModelObj.sobrenome = this.formValue.value.sobrenome;
    this.funcModelObj.email = this.formValue.value.email;
    this.funcModelObj.telefone = this.formValue.value.telefone;
    this.funcModelObj.salario = this.formValue.value.salario;

    this.service.post(this.funcModelObj).subscribe(res=>{
      alert("Funcionário adicionado com sucesso.");
     
      this.formValue.reset();
      this.getFunc();

      let cancel = document.getElementById('cancel');
      cancel?.click();
    },
    err=>{
      alert("Algo deu errado!");
    })
  }

  getFunc(){
    this.service.get().subscribe( res=>{
      this.funcList = res;     
    })
  }

  deleteFunc(id:any){
    this.service.delete(id).subscribe(res =>{ 
      alert('Funcionário excluído.');
      this.getFunc();
    })

    let cancel2 = document.getElementById('cancel2');
    cancel2?.click();
  }

  onEdit(list:any){
    this.funcModelObj.id = list.id;
    this.formValue.controls['nome'].setValue(list.nome);
    this.formValue.controls['sobrenome'].setValue(list.sobrenome);
    this.formValue.controls['email'].setValue(list.email);
    this.formValue.controls['telefone'].setValue(list.telefone);
    this.formValue.controls['salario'].setValue(list.salario);

    this.salvarAdd = false;
    this.salvarEdit = true;
  }

  updateFunc(){
    this.funcModelObj.nome = this.formValue.value.nome;
    this.funcModelObj.sobrenome = this.formValue.value.sobrenome;
    this.funcModelObj.email = this.formValue.value.email;
    this.funcModelObj.telefone = this.formValue.value.telefone;
    this.funcModelObj.salario = this.formValue.value.salario;

    this.service.update(this.funcModelObj.id, this.funcModelObj).subscribe(res=>{
      alert('Funcionário atualizado.')

      this.formValue.reset();
      this.funcModelObj.id = 0;
      this.getFunc();

      let cancel = document.getElementById('cancel');
      cancel?.click();
    })
  }

}
