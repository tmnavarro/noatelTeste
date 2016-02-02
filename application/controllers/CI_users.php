<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CI_users extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_user');
	}

	public function index()
	{
		if($this->session->userdata('validatedLogin')){
			redirect('ci_users/lista_contato','refresh');
		}else{
			$this->load->view('templates/users/login');
		}
	}

	public function authe_user(){
		if($this->session->userdata('validatedLogin')){
			redirect('ci_users/lista_contato','refresh');
		}

		$this->form_validation->set_rules('username', 'User Name', 'trim|required');
		$this->form_validation->set_rules('password', 'Password', 'required|callback_username_check');

		$this->form_validation->set_message('required', 'O campo {field} é requido!');
		$this->form_validation->set_message('username_check', 'Os dados informados não conferem! Tente novamente...');

		if($this->form_validation->run() == FALSE)
		{
			$this->index();
		}
		else
		{
			$this->lista_contato();
		}
	}

	public function username_check(){

		return $this->model_user->autenticacao_login();	
	}

	public function lista_contato(){
		if(!$this->session->userdata('validatedLogin')){
			redirect('','refresh');
		}else{
			$dados['contatos'] = $this->model_user->get_contatos();
			$this->load->view('templates/users/header');
			$this->load->view('templates/users/index', $dados);
			$this->load->view('templates/users/footer');
		}
	}

	public function logout(){
		$this->model_user->logout_user();
		redirect('','refresh');	
	}



}
