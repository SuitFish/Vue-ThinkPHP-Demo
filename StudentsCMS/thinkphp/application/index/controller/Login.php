<?php

namespace app\index\controller;

use app\model\AdminModel;
use Firebase\JWT\JWT;
use think\Request;

class Login extends Cross
{
    public function Login(Request $request)
    {
        $username = $request->param('username');
        $password = $request->param('password');
        $admin = new AdminModel();
        $info = $admin->where('username',$username)->find();
        if(!$info){
            return json(['code'=>0,'msg'=>'账号不存在']);
        }

        if($info['password'] != md5($password)){
            return json(['code'=>0,'msg'=>'账号或密码错误']);
        }
//        jwt
        $jwt = new JWT();
        $key = 'admin';
        $payload = array(
          'iat' => time(),
          'naf' => time(),
            'id'=>$info['id']
        );
        $token = $jwt::encode($payload,$key);
        return json(['code'=>1,'msg'=>'登录成功','token'=>$token]);
    }
}