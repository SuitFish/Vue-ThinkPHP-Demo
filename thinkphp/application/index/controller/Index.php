<?php
namespace app\index\controller;

use app\model\UserModel;
use think\Db;
use think\Request;

class Index extends Cross
{
//    显示
    public function index(Request $request)
    {
        $key = $request->param('key');
        $page = $request->param('page');
        $limit = $request->param('limit');
        $db = new UserModel();
        $total = $db->count('id');
        if(isset($key) && !empty($key)){
            $db = $db->where('name','like','%'.$key.'%');
        }
        $info = $db->page($page)->limit($limit)->select();
        return json(['code'=>1,'data'=>$info, 'total' => $total]);
    }
    public function delete(Request $request)
    {
        $id = $request->param('id');
        $db = new UserModel();
        $res =$db->where('id',$id)->delete();
        if($res){
            return json(['code'=>1,'msg'=>'删除成功']);
        }else{
            return json(['code'=>0,'msg'=>'删除失败']);
        }
    }
    public function save(Request $request)
    {
        $data=$request->param();
        $db = new UserModel();
        if(isset($data['id']) && !empty($data['id'])){
            $res = $db->save($data,['id'=>$data['id']]);
        }else{
            $res =$db->save($data);
        }
        if($res){
            return json(['code'=>1,'msg'=>'添加成功']);
        }else{
            return json(['code'=>0,'msg'=>'添加失败']);
        }
    }
}
