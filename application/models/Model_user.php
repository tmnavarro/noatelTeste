<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_user extends CI_Model {

	public function __construct(){
		parent::__construct();
	}


	public function autenticacao_login(){
		$this->db->where(array(
			'username' => $this->input->post('username'), 
			'password' => md5($this->input->post('password')), 
			));
		$query = $this->db->get('users');

		if($query->num_rows() > 0 ){
			$dados = array(
					'validatedLogin' => true
				);
		
            $this->session->set_userdata($dados);
		}else{
			return FALSE;
		}
	}

	public function get_contatos(){
		$query = $this->db->get('contacts');
		return $query->result_array();
	}

	public function logout_user(){
		$this->session->unset_userdata('validatedLogin');
	}

}