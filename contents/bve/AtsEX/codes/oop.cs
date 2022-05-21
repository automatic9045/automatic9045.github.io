using System;
using System.Windows.Forms;

using Automatic9045.AtsEx.PluginHost;
using Automatic9045.AtsEx.PluginHost.Helpers;

namespace Automatic9045.VehiclePlugins.StateViewer {
    // 規定のクラスを継承することでプラグインとみなされます
    public class StateViewer : AtsExPluginBase, IDisposable {
        private StateForm Form;
        private ToolStripMenuItem MenuItem;

        public StateViewer(HostServiceCollection services) : base(services) {
            InstanceStore.Initialize(App, BveHacker);

            // 右クリックメニューに独自のメニューを追加可能
            MenuItem = ContextMenuHacker.Instance.AddCheckableMenuItem("状態ウィンドウを表示", MenuItemCheckedChanged);

            MenuItem.Checked = false;

            // 独自のフォーム（ウィンドウ）を表示可能
            Form = new StateForm();
            Form.FormClosing += FormClosing;
            Form.WindowState = FormWindowState.Normal;

            MenuItem.Checked = true;
            BveHacker.MainFormSource.Focus();
        }

        public override void Tick() {
            Form?.Tick();
        }

        private void MenuItemCheckedChanged(object sender, EventArgs e) {
            if (MenuItem.Checked) {
                Form.Show(BveHacker.MainFormSource);
            } else {
                Form.Hide();
            }
        }

        private void FormClosing(object sender, FormClosingEventArgs e) {
            e.Cancel = true;
            MenuItem.Checked = false;
        }

        public void Dispose() {
            Form.FormClosing -= FormClosing;
            Form.Close();
            Form.Dispose();
        }
    }
}
